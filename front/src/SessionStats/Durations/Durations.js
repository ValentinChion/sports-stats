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
    let months = [];
    let weeks = [];
    let minToShow = 0;
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData) && sportData[0].hasOwnProperty("sessions") && element !== "basketball" ) {
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
          let firstExerciseLoopMonth = false;
          let firstExerciseLoopWeek = false;
          session.exercises.map((exercise, idxExercise) => {
            // First we add the stats by month
            let totalTime;
            if (element === "running") totalTime = runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms);
            if (currMonth && moment(session.date).isBetween(startMonth, endMonth)) {
              if (element === "running") {
                sportSessionsByMonths[idxMonth].total.kms += +exercise.kms;
                sportSessionsByMonths[idxMonth].total.time += +totalTime;
                if (exercise.name !== "Récupération") {
                  sportSessionsByMonths[idxMonth].total.allure[0] += totalTime;
                  sportSessionsByMonths[idxMonth].total.allure[1] += +exercise.kms;
                }
              } else if (element === "weightTraining" && !firstExerciseLoopMonth) {
                sportSessionsByMonths[idxMonth].duration += +session.duration;
                firstExerciseLoopMonth = true;
              }

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
                else {
                  sportSessionsByMonths[idxMonth].exercises.push({
                    name: exercise.name,
                    repets: exercise.training.reduce(arrayUtils.sumReducer),
                  });
                }
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
                  total: {
                    kms: +exercise.kms,
                    time: totalTime,
                    allure: [totalTime, +exercise.kms],
                  },
                });
              } else {
                sportSessionsByMonths.push({
                  month: currMonth,
                  duration: +session.duration,
                  exercises: [
                    {
                      name: exercise.name,
                      repets: exercise.training.reduce(arrayUtils.sumReducer),
                    },
                  ],
                });
                firstExerciseLoopMonth = true;
              }
            }

            if (moment(session.date).isBetween(startWeek, endWeek)) {
              const idxEx = sportSessionsByWeeks[idxWeek].exercises.findIndex((ex) => ex.name === exercise.name);
              if (element === "running") {
                sportSessionsByWeeks[idxWeek].total.kms += +exercise.kms;
                sportSessionsByWeeks[idxWeek].total.time += totalTime;
                sportSessionsByWeeks[idxWeek].total.allure.push(totalTime / +exercise.kms);
              } else if (!firstExerciseLoopWeek) {
                sportSessionsByWeeks[idxWeek].duration += (+session.duration);
                firstExerciseLoopWeek = true;
              }

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
                else {
                  sportSessionsByWeeks[idxWeek].exercises.push({
                    name: exercise.name,
                    repets: exercise.training.reduce(arrayUtils.sumReducer),
                  });
                }
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
                  total: {
                    kms: +exercise.kms,
                    time: totalTime,
                    allure: [totalTime, +exercise.kms],
                  },
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
                firstExerciseLoopWeek = true;
                sportSessionsByWeeks[idxWeek].duration = +session.duration;
              }
            }

            return true;
          });
          return true;
        });

        const currMinToShow = Math.min(++idxWeek, ++idxMonth, 2);
        minToShow = Math.max(minToShow, currMinToShow);

        if (element === "running") {
          sportSessionsByMonths.map((_, idx) => {
            sportSessionsByMonths[idx].exercises = sportSessionsByMonths[idx].exercises.map((exercise) => {
              exercise.time = globalUtils.formatDuration(exercise.time);
              exercise.allure = globalUtils.formatDuration(exercise.allure.reduce(arrayUtils.sumReducer) / exercise.allure.length);
              return exercise;
            });
            sportSessionsByMonths[idx].total.time = globalUtils.formatDuration(sportSessionsByMonths[idx].total.time);
            sportSessionsByMonths[idx].total.allure = globalUtils.formatDuration(sportSessionsByMonths[idx].total.allure[0] / sportSessionsByMonths[idx].total.allure[1]);

            return true;
          });

          sportSessionsByWeeks.map((_, idx) => {
            sportSessionsByWeeks[idx].exercises = sportSessionsByWeeks[idx].exercises.map((exercise) => {
              exercise.time = globalUtils.formatDuration(exercise.time);
              exercise.allure = globalUtils.formatDuration(exercise.allure.reduce(arrayUtils.sumReducer) / exercise.allure.length);
              return exercise;
            });
            sportSessionsByWeeks[idx].total.time = globalUtils.formatDuration(sportSessionsByWeeks[idx].total.time);
            sportSessionsByWeeks[idx].total.allure = globalUtils.formatDuration(sportSessionsByWeeks[idx].total.allure[0] / sportSessionsByWeeks[idx].total.allure[1]);

            return true;
          });
        } else {
          sportSessionsByMonths = sportSessionsByMonths.map((month) => {
            month.duration = globalUtils.formatDuration(month.duration);
            return month;
          });

          sportSessionsByWeeks = sportSessionsByWeeks.map((week) => {
            week.duration = globalUtils.formatDuration(week.duration);
            return week;
          });
        }

        months.push({
          sport: element,
          months: sportSessionsByMonths,
        });

        weeks.push({
          sport: element,
          weeks: sportSessionsByWeeks,
        });
      }
    }

    // From sport data per months, we go to all sports data per months.
    let allDataByMonths = [];
    months.map((sportData) => {
      const currLength = allDataByMonths.length;
      if (currLength) {
        sportData.months.map((monthData) => {
          let isNewMonth = true;
          let addData = monthData.exercises;
          if (monthData.hasOwnProperty("total"))
            addData.push({
              name: "Total",
              ...monthData.total,
            });
          if (monthData.hasOwnProperty("duration")) {
            addData.push({
              name: "Temps passé",
              repets: monthData.duration,
            });
          }

          allDataByMonths.map((newMonthData, idxMonth) => {
            if (newMonthData.month === monthData.month) {
              allDataByMonths[idxMonth][sportData.sport] = addData;
              isNewMonth = false;
            }
            return true;
          });
          if (isNewMonth) {
          // TODO --> Check if it's still working in October
            const dataWithMonth = {
              'month': monthData.month,
              [sportData.sport]: addData
            } 
            if (allDataByMonths.length === currLength) {
              allDataByMonths.unshift(dataWithMonth);
            } else {
              const dataToExchange = allDataByMonths[allDataByMonths.length - currLength - 1];
              allDataByMonths[allDataByMonths.length - currLength - 1] = dataWithMonth;
              allDataByMonths.unshift(dataToExchange);
            }
          }
          return true;
        });
      } else {
        allDataByMonths = sportData.months.map((month) => {
          let addData = month.exercises;
          if (month.hasOwnProperty("total"))
            addData.push({
              name: "Total",
              ...month.total,
            });
          if (month.hasOwnProperty("duration")) {
            addData.push({
              name: "Temps passé",
              repets: month.duration,
            });
          }
          return {
            month: month.month,
            [sportData.sport]: addData,
          };
        });
      }
      return true;
    });

    // Same with weeks
    let allDataByWeeks = [];
    weeks.map((sportData) => {
      if (allDataByWeeks.length) {
        sportData.weeks.map((weekData) => {
          allDataByWeeks.map((newWeekData, idxWeek) => {
            if (newWeekData.week === weekData.week) {
              let addData = weekData.exercises;
              if (weekData.hasOwnProperty("total"))
                addData.push({
                  name: "Total",
                  ...weekData.total,
                });
              if (weekData.hasOwnProperty("duration")) {
                addData.push({
                  name: "Temps passé",
                  repets: weekData.duration,
                });
              }
              allDataByWeeks[idxWeek][sportData.sport] = addData;
            }
            return true;
          });
          return true;
        });
      } else {
        allDataByWeeks = sportData.weeks.map((week) => {
          let addData = week.exercises;
          if (week.hasOwnProperty("total"))
            addData.push({
              name: "Total",
              ...week.total,
            });
          if (week.hasOwnProperty("duration")) {
            addData.push({
              name: "Temps passé",
              repets: week.duration,
            });
          }
          return {
            week: week.week,
            [sportData.sport]: addData,
          };
        });
      }
      return true;
    });

    this.setState({ months: allDataByMonths, weeks: allDataByWeeks, minToShow });
  }

  render() {
    return (
      <>
        <DurationsDisplayer months={this.state.months} weeks={this.state.weeks} minToShow={this.state.minToShow} />
      </>
    );
  }
}

export default Durations;
