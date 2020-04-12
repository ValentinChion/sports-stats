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
        <ListExercises sportType="weightTraining"/>
        <AddExercise sportType="weightTraining"
                     exerciseTypes={constants.WEIGHT_TRAINING.TYPES}/>
      </>
    )
  }
}

export default WeightTrainingDisplayer;
