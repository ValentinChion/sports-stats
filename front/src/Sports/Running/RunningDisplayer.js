import React from 'react';
import AddSession from '../../Data/ManageSports/Sessions/AddSession/AddSession';
import ListExercises from '../../Data/ManageSports/Exercises/ListExercises/ListExercises';
import AddExercise from '../../Data/ManageSports/Exercises/AddExercise/AddExercise';
import constants from '../../utils/constants/global';

class RunningDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
        <AddSession sportType="running"/>
        <ListExercises sportType="running"/>
        <AddExercise sportType="running"
                     exerciseTypes={constants.RUNNING.TYPES}/>
      </>
    )
  }
}

export default RunningDisplayer;
