import React from "react";
import TopDisplayer from "./TopDisplayer";
import constants from "../../utils/constants/global";
import storageHandler from "../../utils/localStorage/storage";
import moment from "moment";
import arrayUtils from "../../utils/arrayUtils";
import runningUtils from "../../utils/runningUtils";
import globalUtils from "../../utils/globalUtils";

class Top extends React.Component {
  state = {
    exercises: undefined,
    topByExercise: undefined,
  };

  componentDidMount() {
    let maxs;
    let name;
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData) && sportData[0].hasOwnProperty("sessions")) {
        if (element !== "running") {
          name = "weightTrainingMaxs";
          maxs = sportData[0].sessions.reduce((acc, current) => {
            current.exercises.map((exercise) => {
              exercise.training = exercise.training.reduce(arrayUtils.sumReducer);
              if (acc[exercise.name]) {
                acc[exercise.name] = Math.max(acc[exercise.name], exercise.training);
              } else acc[exercise.name] = exercise.training;
            });

            return acc;
          }, {});
        } else {
          name = "runningMaxs";
          console.log(sportData[0]);
          maxs = sportData[0].sessions.reduce((accSes, session) => {
            if (!accSes.distances) accSes.distances = {};
            if (!accSes.byTime) accSes.byTime = {};

            session.exercises.map((exercise) => {
              if (exercise.name && exercise.name !== "Récupération") {
                if (!accSes.distances.hasOwnProperty(exercise.name)) {
                  accSes.distances[exercise.name] = exercise.kms;
                } else {
                  accSes.distances[exercise.name] = Math.max(accSes.distances[exercise.name], exercise.kms);
                }

                if (accSes.byTime.hasOwnProperty(exercise.name)) {
                  let currTime = runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms);
                  if (exercise.kms / currTime > accSes.byTime[exercise.name].kms / accSes.byTime[exercise.name].time) {
                    accSes.byTime[exercise.name] = {
                      kms: exercise.kms,
                      time: currTime
                    }
                  }
                } else {
                  accSes.byTime[exercise.name] = {
                    kms: exercise.kms,
                    time: runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms),
                  };
                }
              }
            });
            return accSes;
          }, {});

          console.log(maxs);
        }

        if (maxs && name) {
          if (element !== "running") {
            sportData[0].exercises.map((exercise) => {
              if (!maxs.hasOwnProperty(exercise.name)) {
                maxs[exercise.name] = 0;
              } else {
                if (exercise.type === "Temps") {
                  maxs[exercise.name] = globalUtils.formatDuration(maxs[exercise.name])
                }
              }
            });
          } else {
            const byTimeKeys = Object.keys(maxs.byTime);
            byTimeKeys.map((byTimeKey) => {
              maxs.byTime[byTimeKey].time = globalUtils.formatDuration(maxs.byTime[byTimeKey].time)
            }) 
          }

          this.setState({
            exercises: sportData[0].exercises,
            [name]: maxs,
          });
        }
      }
    }
  }

  render() {
    return (
      <>
        <TopDisplayer weightTrainingMaxs={this.state.weightTrainingMaxs} />
      </>
    );
  }
}

export default Top;
