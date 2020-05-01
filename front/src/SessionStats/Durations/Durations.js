import React from "react";
import DurationsDisplayer from "./DurationsDisplayer";
import constants from "../../utils/constants/global";
import storageHandler from "../../utils/localStorage/storage";
import globalUtils from "../../utils/globalUtils";
import moment from "moment";
import runningUtils from "../../utils/runningUtils";
import arrayUtils from "../../utils/arrayUtils";

class Durations extends React.Component {
  state = {};

  componentDidMount() {
    let months = {};
    let weeks = {};
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData) && sportData[0].hasOwnProperty("sessions")) {
        // Handle Data for stats by months
        const sportSessions = globalUtils.sortByDate(sportData[0].sessions);
        let startMonth = moment(sportSessions[0].date).startOf("month");
        let endMonth = moment(sportSessions[0].date).endOf("month");
        let currMonth;
        let idxMonth = 0;
        let sportSessionsByMonths = [];

        // Handle data for stats by weeks
        let startWeek;
        let endWeek;
        let sportSessionsByWeeks = [];
        let idxWeek = -1;

        sportSessions.map((session) => {
          session.exercises.map((exercise) => {
            // First we add the stats by month
            let totalTime;
            if (element === "running") totalTime = runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms);

            if (currMonth && moment(session.date).isBetween(startMonth, endMonth)) {
              const idxEx = sportSessionsByMonths[idxMonth].exercises.findIndex((ex) => ex.name === exercise.name);
              if (idxEx >= 0) {
                if (element === "running") {
                  sportSessionsByMonths[idxMonth].exercises[idxEx].allure.push(totalTime / +exercise.kms);
                  sportSessionsByMonths[idxMonth].exercises[idxEx].kms += +exercise.kms;
                  sportSessionsByMonths[idxMonth].exercises[idxEx].time += totalTime;
                } else {
                  sportSessionsByMonths[idxMonth].exercises[idxEx].repets += exercise.training.reduce(arrayUtils.sumReducer);
                }
              } else {
                if (element === "running")
                  sportSessionsByMonths[idxMonth].exercises.push({
                    name: exercise.name,
                    kms: +exercise.kms,
                    time: totalTime,
                    allure: [totalTime / +exercise.kms],
                  });
                else
                  sportSessionsByMonths[idxMonth].exercises.push({
                    name: exercise.name,
                    repets: exercise.training.reduce(arrayUtils.sumReducer),
                  });
              }
            } else {
              if (currMonth) idxMonth++;
              startMonth = moment(session.date).startOf("month");
              endMonth = moment(session.date).endOf("month");
              currMonth = startMonth.format("MMMM");

              if (element === "running") {
                sportSessionsByMonths.push({
                  month: currMonth,
                  exercises: [
                    {
                      name: exercise.name,
                      kms: +exercise.kms,
                      time: totalTime,
                      allure: [totalTime / +exercise.kms],
                    },
                  ],
                });
              } else {
                sportSessionsByMonths.push({
                  month: currMonth,
                  exercises: [
                    {
                      name: exercise.name,
                      repets: exercise.training.reduce(arrayUtils.sumReducer),
                    },
                  ],
                });
              }
            }

            if (moment(session.date).isBetween(startWeek, endWeek)) {
              const idxEx = sportSessionsByWeeks[idxWeek].exercises.findIndex((ex) => ex.name === exercise.name);
              if (idxEx >= 0) {
                if (element === "running") {
                  sportSessionsByWeeks[idxWeek].exercises[idxEx].allure.push(totalTime / +exercise.kms);
                  sportSessionsByWeeks[idxWeek].exercises[idxEx].kms += +exercise.kms;
                  sportSessionsByWeeks[idxWeek].exercises[idxEx].time += totalTime;
                } else {
                  sportSessionsByWeeks[idxWeek].exercises[idxEx].repets += exercise.training.reduce(arrayUtils.sumReducer);
                }
              } else {
                if (element === "running")
                  sportSessionsByWeeks[idxWeek].exercises.push({
                    name: exercise.name,
                    kms: +exercise.kms,
                    time: totalTime,
                    allure: [totalTime / +exercise.kms],
                  });
                else
                  sportSessionsByWeeks[idxWeek].exercises.push({
                    name: exercise.name,
                    repets: exercise.training.reduce(arrayUtils.sumReducer),
                  });
              }
            } else {
              startWeek = moment(session.date).startOf("week");
              endWeek = moment(session.date).endOf("week");
              idxWeek += 1;
              let weekName = "Du " + startWeek.format("DD");
              if (startWeek.format("MMMM") !== endWeek.format("MMMM")) weekName += " " + startWeek.format("MMMM");
              weekName += " au " + endWeek.format("DD MMMM");

              if (element === "running") {
                sportSessionsByWeeks.push({
                  week: weekName,
                  exercises: [
                    {
                      name: exercise.name,
                      kms: +exercise.kms,
                      time: totalTime,
                      allure: [totalTime / +exercise.kms],
                    },
                  ],
                });
              } else {
                sportSessionsByWeeks.push({
                  week: weekName,
                  exercises: [
                    {
                      name: exercise.name,
                      repets: exercise.training.reduce(arrayUtils.sumReducer),
                    },
                  ],
                });
              }
            }

            return true;
          });
          return true;
        });

        if (element === "running") {
          sportSessionsByMonths.map((month, idx) => {
            sportSessionsByMonths[idx].exercises = sportSessionsByMonths[idx].exercises.map((exercise) => {
              exercise.time = globalUtils.formatDuration(exercise.time);
              exercise.allure = globalUtils.formatDuration(exercise.allure.reduce(arrayUtils.sumReducer) / exercise.allure.length);
              return exercise;
            });
          });
        }

        months[element] = sportSessionsByMonths;
        weeks[element] = sportSessionsByWeeks;
      }
    }
    this.setState({ months, weeks });
  }

  render() {
    return (
      <>
        <DurationsDisplayer months={this.state.months} weeks={this.state.weeks} />
      </>
    );
  }
}

export default Durations;
