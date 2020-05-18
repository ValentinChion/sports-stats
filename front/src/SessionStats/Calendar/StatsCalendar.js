import React from "react";
import StatsCalendarDisplayer from "./StatsCalendarDisplayer";
import globalUtils from "../../utils/globalUtils";
import moment from "moment";
import runningUtils from "../../utils/runningUtils";

class StatsCalendar extends React.Component {
  state = {
    sessions: undefined,
  };

  componentDidMount() {
    let sportsData = globalUtils.getAllExercices();

    const sessionsForCalendar = this.transformInCalendarData(sportsData);
    this.setState({sessions: sessionsForCalendar});
  }

  transformInCalendarData = (sports) => {
    const maxValue = 1600;
    const minValue = 50;
    let sessions = [];

    Object.entries(sports).map((sport, idxSp) => {
      let [sportName, sportData] = sport;

      sportData.sessions &&
        sportData.sessions.map((session) => {
          let valueOfSession = minValue;
          if (sportName === "running") {
            session.exercises.map((exercise) => {
              if (exercise.name !== "Récupération") {
                const allure = runningUtils.getAllure(exercise);
                const allureRatio = allure / 1000;
                const [min, max] = exercise.name === "Fractionné" ? [5.5, 7] : [6, 9];
                let kmFactor = 1;
                if (+(exercise.kms) >= max) kmFactor = 2;
                else if (+(exercise.kms) < min) kmFactor = 0.75;

                valueOfSession = Math.round(Math.min((valueOfSession * kmFactor) / (3 * allureRatio ** 3), maxValue));
              }
            });
          } else {
            const sessionDuration = +(session.duration);
            valueOfSession = Math.round(Math.min(valueOfSession * (sessionDuration ** 2) / 400000, maxValue));
          }
          const dateToAdd = moment(session.date).format("YYYY-MM-DD");

          sessions.push({day: dateToAdd, date: moment(session.date), value: valueOfSession})
          return true;
        });
      return true;
    });

    sessions = globalUtils.sortByDate(sessions)
    let isMultiSession = false;
    sessions = sessions.map((session, idx) => {
      let valueOfSession = session.value;
      if (idx + 1 < sessions.length && session.day === sessions[idx + 1].day) {
        isMultiSession = true;
        return undefined;
      }
      if (isMultiSession) {
        valueOfSession = 2000;
        isMultiSession = false;
      }
      return {
        day: session.day,
        value: valueOfSession
      } 
    }).filter(session => session);

    return sessions;
  };

  render() {
    return (
      <>
        <StatsCalendarDisplayer sessions={this.state.sessions}/>
      </>
    );
  }
}

export default StatsCalendar;
