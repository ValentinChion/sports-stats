import React from 'react';
import AddExercise from '../AddExercise/AddExercise';
import constants from '../../../utils/constants/global';

class WeightTrainingDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
        <AddExercise sportType="weightTraining"
                     exerciseTypes={constants.WEIGHT_TRAINING.TYPES}/>
      </>
    )
  }
}

export default WeightTrainingDisplayer;
