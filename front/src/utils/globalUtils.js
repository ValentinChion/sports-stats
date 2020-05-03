/**
 * Functions usable on whole project
 */
import moment from "moment";
import constants from './constants/global';
import storageHandler from './localStorage/storage';

const globalUtils = {
  formatDuration: (seconds) => {
    return moment.utc(moment.duration(seconds, "seconds").asMilliseconds()).format("HH:mm:ss");
  },

  stringDurationAsSeconds: (duration) => {
    return moment.duration(duration).asSeconds();
  },

  sortByDate: (objectsWithDates) => objectsWithDates.sort((b, a) => moment(a.date).diff(b.date)),

  getAllExercices: () => {
    return constants.AVAILABLE_SPORTS.reduce((acc, sport) => {
      const sportData = storageHandler.get(sport);
      acc[sport] = storageHandler.isError(sportData) ? {} : sportData[0];
      return acc
    }, {})
  }
};

export default globalUtils;
