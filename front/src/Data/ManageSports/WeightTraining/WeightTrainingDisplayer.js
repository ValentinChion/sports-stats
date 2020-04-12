import React from 'react';
import constants from '../../../utils/constants/global';
import ListExercises from '../Exercises/ListExercises/ListExercises';
import AddExercise from '../Exercises/AddExercise/AddExercise';
import AddSession from '../Sessions/AddSession/AddSession';

class WeightTrainingDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
        <AddSession sportType="weightTraining"/>
        <ListExercises sportType="weightTraining"/>
        <AddExercise sportType="weightTraining"
                     exerciseTypes={constants.WEIGHT_TRAINING.TYPES}/>
      </>
    )
  }
}

export default WeightTrainingDisplayer;