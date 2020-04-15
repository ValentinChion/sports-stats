import React from 'react';
import TopDisplayer from './TopDisplayer';
import constants from '../../utils/constants/global';
import storageHandler from '../../utils/localStorage/storage';
import moment from 'moment';
import arrayUtils from '../../utils/arrayUtils';

class Top extends React.Component {
  state = {
    exercises: undefined,
    topByExercise: undefined
  };

  componentDidMount() {
    
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData)) {
        let maxs = sportData[0].sessions.reduce((acc, current) => {
          current.exercises.map((exercise) => {
            exercise.training = exercise.training.reduce(arrayUtils.sumReducer);
            if (acc[exercise.name]) {
              acc[exercise.name] = Math.max(acc[exercise.name], exercise.training);
            } else acc[exercise.name] = exercise.training;
          });

          return acc
        }, {});

        sportData[0].exercises.map((exercise) => {
          if (!maxs.hasOwnProperty(exercise.name)) {
            maxs[exercise.name] = 0
          } else {
            if (exercise.type === "Temps") {
              maxs[exercise.name] = moment.utc(moment.duration(maxs[exercise.name], "seconds").asMilliseconds()).format("HH:mm:ss");
            }
          }
        })

        this.setState({
          exercises: sportData[0].exercises,
          topByExercise: maxs
        })
      }
    }
  };

  render() {
    return (
      <>
        <TopDisplayer topByExercise={this.state.topByExercise}/>
      </>
    )
  }
}

export default Top;
