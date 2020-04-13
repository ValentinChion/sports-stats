import React from 'react';
import AddSessionDisplayer from './AddSessionDisplayer';
import storageHandler from '../../../../utils/localStorage/storage';

class AddSession extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Remplir une nouvelle séance",
    exercises: undefined,
    sessionDate: undefined,
    focused: true,
    exerciseChoosed: [],
    exerciseNbr: 0,
    circuitNbr: 0,
    exerciseValues: [],
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
    let exerciseValues = [...this.state.exerciseValues];
    let defaultVal = this.state.exercises.find(exercise => exercise.name === e.target.value).default;
    
    exerciseChoosed[idxEx] = e.target.value;
    exerciseValues[idxEx] = exerciseValues[idxEx].map((repet) => repet === 0 ? defaultVal : repet);

    this.setState({
      exerciseChoosed: exerciseChoosed,
      exerciseValues: exerciseValues
    })
  }

  handleRepetChange = (idxEx, idxRepet) => (e) => {
    let exerciseValues = [...this.state.exerciseValues];
    exerciseValues[idxEx][idxRepet] = +e.target.value;
    this.setState({
      exerciseValues: exerciseValues
    })
  }

  handleAddSession = () => {
    const {
      exerciseChoosed,
      exerciseValues
    } = this.state;

    let session = exerciseChoosed.map((exerciseName, idxEx) => {
      return {
        name: exerciseName,
        training: exerciseValues[idxEx]
      }
    })

    const sportContainer = storageHandler.get(this.props.sportType);
    if (!storageHandler.isError(sportContainer)) {
      let sessions;
      if (sportContainer[0].hasOwnProperty("sessions")) {
        sessions = sportContainer[0].sessions;
        sessions.push(session);
      } else {
        sessions = [session]
      }
      sportContainer[0].sessions = sessions;
      const result = storageHandler.set(this.props.sportType, sportContainer[0]);

      if (storageHandler.isError(result)) console.log(result);
    } else console.log(sportContainer);
  }

  handleDateChanged = (date) => this.setState({sessionDate: date.date});
  handleDateFocus = (focused) => {this.setState({focused: focused.focused});}

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
                             handleRepetChange={this.handleRepetChange}
                             handleAddSession={this.handleAddSession}
                             sessionDate={this.state.sessionDate}
                             handleDateChanged={this.handleDateChanged}
                             focused={this.state.focused}
                             handleDateFocus={this.handleDateFocus}/>
      </>
    )
  }
}

export default AddSession;
