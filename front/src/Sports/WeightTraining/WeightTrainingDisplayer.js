import React from 'react';
import constants from '../../utils/constants/global';
import AddSession from '../../Data/ManageSports/Sessions/AddSession/AddSession';
import ListExercises from '../../Data/ManageSports/Exercises/ListExercises/ListExercises';
import AddExercise from '../../Data/ManageSports/Exercises/AddExercise/AddExercise';

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