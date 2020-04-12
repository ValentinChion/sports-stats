import React from 'react';
import AddSessionDisplayer from './AddSessionDisplayer';
import storageHandler from '../../../../utils/localStorage/storage';

class AddSession extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Remplir une nouvelle séance",
    exercises: undefined,
    exerciseChoosed: [],
    exerciseNbr: 0,
    circuitNbr: 0,
    exerciseValues: []
  }

  componentDidMount() {
    const exercises = storageHandler.get(this.props.sportType)[0].exercises;
    this.setState({
      exercises: exercises
    });

    document.addEventListener('storageSet', this.handleNewExercise, false);
  }

  handleNewExercise = (e) => {
    e.key === this.props.sportType && this.setState({
      exercises: JSON.parse(e.value).values[0].exercises
    });
  }

  handleClickNewSession = (e) => {
    let triggerForm;
    let triggerButton;
    if (this.state.displayForm) {
      triggerForm = ""
      triggerButton = "Cacher la création"
    } else {
      triggerForm = "hidden"
      triggerButton = "Remplir une nouvelle séance"
    }

    this.setState({
      displayForm: triggerForm,
      buttonContent: triggerButton
    })
  }

  handleChangeNumberInput = (e) => {
    let exerciseValues = [...this.state.exerciseValues];
    let exerciseChoosed = [...this.state.exerciseChoosed];
    if (e.target.name === "exerciseNbr") {
      const arrayToAdd = Array(this.state.circuitNbr).fill(0);
      if (e.target.value > this.state.exerciseNbr) {
        exerciseValues.push(arrayToAdd);
        exerciseChoosed.push("notChoosed");
      }
      if (e.target.value < this.state.exerciseNbr) {
        exerciseValues.pop();
        exerciseChoosed.pop();
      }
    } else {
      if (e.target.value > this.state.circuitNbr) exerciseValues = exerciseValues.map(values => {
        return values.concat([0]);
      });
      if (e.target.value < this.state.circuitNbr) exerciseValues = exerciseValues.map(values => {
        values.pop();
        return values;
      }); 
    }

    this.setState({
      exerciseValues: exerciseValues,
      exerciseChoosed: exerciseChoosed,
      [e.target.name]: +e.target.value
    })
  }

  handleChooseExercise = (idxEx) => (e) => {
    const exerciseChoosed = [...this.state.exerciseChoosed];
    exerciseChoosed[idxEx] = e.target.value;

    this.setState({
      exerciseChoosed: exerciseChoosed
    })
  }

  handleRepetChange = (idxEx, idxRepet) => (e) => {
    let exerciseValues = [...this.state.exerciseValues];
    exerciseValues[idxEx][idxRepet] = +e.target.value;
    this.setState({
      exerciseValues: exerciseValues
    })
  }

  render() {
    return (
      <>
        <AddSessionDisplayer handleClickNewSession={this.handleClickNewSession}
                             displayForm={this.state.displayForm}
                             buttonContent={this.state.buttonContent}
                             handleChangeNumberInput={this.handleChangeNumberInput}
                             exercises={this.state.exercises}
                             exerciseChoosed={this.state.exerciseChoosed}
                             handleChooseExercise={this.handleChooseExercise}
                             exerciseNbr={this.state.exerciseNbr}
                             circuitNbr={this.state.circuitNbr}
                             exerciseValues={this.state.exerciseValues}
                             handleRepetChange={this.handleRepetChange}/>
      </>
    )
  }
}

export default AddSession;
