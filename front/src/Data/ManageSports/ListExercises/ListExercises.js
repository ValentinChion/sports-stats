import React from 'react';
import ListExercisesDisplayer from './ListExercisesDisplayer';
import storageHandler from '../../../utils/localStorage/storage';

class ListExercises extends React.Component {
  state = {
    exercises: undefined
  }

  componentDidMount() {
    const exercises = storageHandler.get(this.props.sportType)[0].exercises;
    this.setState({
      exercises: exercises
    });

    document.addEventListener('storageSet', this.handleNewExercise, false);
  }

  handleNewExercise = (e) => {
    this.setState({
      exercises: JSON.parse(e.value).values[0].exercises
    })
  }

  render() {
    return (
      <>
        <ListExercisesDisplayer exercises={this.state.exercises}/>
      </>
    )
  }
}

export default ListExercises;
