import React from 'react';
import AddExercise from '../AddExercise/AddExercise';
import constants from '../../../utils/constants/global';
import ListExercises from '../ListExercises/ListExercises';

class WeightTrainingDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
        <AddExercise sportType="weightTraining"
                     exerciseTypes={constants.WEIGHT_TRAINING.TYPES}/>
        <ListExercises sportType="weightTraining"/>
      </>
    )
  }
}

export default WeightTrainingDisplayer;
