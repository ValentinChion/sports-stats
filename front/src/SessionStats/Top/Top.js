/* eslint-disable no-loop-func */
import React from "react";
import TopDisplayer from "./TopDisplayer";
import constants from "../../utils/constants/global";
import storageHandler from "../../utils/localStorage/storage";
import arrayUtils from "../../utils/arrayUtils";
import runningUtils from "../../utils/runningUtils";
import globalUtils from "../../utils/globalUtils";

class Top extends React.Component {
  state = {
    exercises: undefined,
    topByExercise: undefined,
    runningMaxs: undefined,
  };

  componentDidMount() {
    let maxs;
    let name;
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData) && sportData[0].hasOwnProperty("sessions")) {
        if (element === "weightTraining") {
          name = "weightTrainingMaxs";
          maxs = sportData[0].sessions.reduce((acc, current) => {
            current.exercises.map((exercise) => {
              exercise.training = exercise.training.reduce(arrayUtils.sumReducer);
              if (acc[exercise.name]) {
                acc[exercise.name] = Math.max(acc[exercise.name], exercise.training);
              } else acc[exercise.name] = exercise.training;
              return true;
            });

            return acc;
          }, {});
        } else if (element === "running") {
          name = "runningMaxs";
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
                  if (exercise.kms / currTime > accSes.byTime[exercise.name]["Distance Parcourue"] / accSes.byTime[exercise.name]["Temps Écoulé"]) {
                    accSes.byTime[exercise.name] = {
                      "Distance Parcourue": exercise.kms,
                      "Temps Écoulé": currTime,
                      "Allure Moyenne": currTime / exercise.kms,
                    };
                  }
                } else {
                  accSes.byTime[exercise.name] = {
                    "Distance Parcourue": exercise.kms,
                    "Temps Écoulé": runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms),
                  };
                }
              }
              return true;
            });
            return accSes;
          }, {});
        }

        if (maxs && name) {
          if (element === "weightTraining") {
            sportData[0].exercises.map((exercise) => {
              if (!maxs.hasOwnProperty(exercise.name)) {
                maxs[exercise.name] = 0;
              } else {
                if (exercise.type === "Temps") {
                  maxs[exercise.name] = globalUtils.formatDuration(maxs[exercise.name]);
                }
              }
              return true;
            });
          } else if (element === "running") {
            // Reformat data for display
            const byTimeKeys = Object.keys(maxs.byTime);
            byTimeKeys.map((byTimeKey) => {
              maxs.byTime[byTimeKey]["Temps Écoulé"] = globalUtils.formatDuration(maxs.byTime[byTimeKey]["Temps Écoulé"]);
              maxs.byTime[byTimeKey]["Allure Moyenne"] = globalUtils.formatDuration(maxs.byTime[byTimeKey]["Allure Moyenne"]);
              return true;
            });
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
        <TopDisplayer weightTrainingMaxs={this.state.weightTrainingMaxs} runningMaxs={this.state.runningMaxs} />
      </>
    );
  }
}

export default Top;
