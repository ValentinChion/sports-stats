/**
 * Functions usable on whole project
 */
import moment from "moment";

const globalUtils = {
  formatDuration: (seconds) => {
    return moment.utc(moment.duration(seconds, "seconds").asMilliseconds()).format("HH:mm:ss");
  },
};

export default globalUtils;
