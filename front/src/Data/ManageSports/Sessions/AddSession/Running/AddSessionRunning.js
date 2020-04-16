import React from 'react';
import AddSessionRunningDisplayer from './AddSessionRunningDisplayer';
import storageHandler from '../../../../../utils/localStorage/storage';

class AddSessionRunning extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Remplir une nouvelle séance",
    sessionDate: undefined,
    focused: true,
    exercisesSession: [],
    exerciseNbr: 0
  }

  componentDidMount() {
    const exercises = storageHandler.get("running")[0].exercises;
    this.setState({
      exercises: exercises
    });

    document.addEventListener('storageSet', this.handleNewExercise, false);
  }

  handleNewExercise = (e) => {
    e.key === "running" && this.setState({
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

  handleDateChanged = (date) => {
    this.setState({sessionDate: date});
  }

  handleDateFocus = (focused) => {this.setState({focused: focused.focused});}

  handleChangeNumberInput = (e) => {
    let exercisesSession = [...this.state.exercisesSession];
    
    if (e.target.value > exercisesSession.length) {
      exercisesSession.push({
        name: "notChoosed", 
        kms:0,
        kmsTimes: [],
      });
    } else {
      exercisesSession.pop();
    }

    this.setState({
      exercisesSession,
      exerciseNbr: e.target.value
    })
  };

  handleChooseExercice = (idxEx) => (e) => {
    let exercisesSession = [...this.state.exercisesSession];
    exercisesSession[idxEx].name = e.target.value;
    let defaultVal = this.state.exercises.find(exercise => exercise.name === e.target.value).default;

    if (exercisesSession[idxEx].kmsTimes.length > 0 && defaultVal) {
      exercisesSession[idxEx].kmsTimes = exercisesSession[idxEx].kmsTimes.map(kmTime => 
        kmTime ? kmTime : defaultVal);
    }

    this.setState({exercisesSession});
  };

  handleKmChange = (idxEx) => (e) => {
    let exercisesSession = [...this.state.exercisesSession];
    exercisesSession[idxEx].kms = e.target.value;
    let diff = e.target.value - exercisesSession[idxEx].kmsTimes.length;
    
    if (diff > 0) {
      exercisesSession[idxEx].kmsTimes.push(...Array(Math.ceil(diff)).fill(0));
    } else if (diff <= -1) {
      diff *= -1;
      for (let i = 0; i < diff; i++) {
        exercisesSession[idxEx].kmsTimes.pop();
      }
    }

    this.setState({exercisesSession});
  };

  handleTimeInput = (idxEx, idxKm) => (e) => {
    let exercisesSession = [...this.state.exercisesSession];
    
    exercisesSession[idxEx].kmsTimes[idxKm] = e.target.value;
  }

  render() {
    return (
      <>
        <AddSessionRunningDisplayer // Trigger form
                                    displayForm={this.state.displayForm}
                                    buttonContent={this.state.buttonContent}
                                    handleClickNewSession={this.handleClickNewSession}
                                    // Date picker
                                    sessionDate={this.state.sessionDate}
                                    handleDateChanged={this.handleDateChanged}
                                    focused={this.state.focused}
                                    handleDateFocus={this.handleDateFocus}
                                    // form handlers
                                    exerciseNbr={this.state.exerciseNbr}
                                    exercisesSession={this.state.exercisesSession}
                                    handleChangeNumberInput={this.handleChangeNumberInput}
                                    // table form handlers
                                    exerciseNames={this.state.exercises && this.state.exercises.map(exercise => exercise.name)}
                                    handleChooseExercice={this.handleChooseExercice}
                                    handleKmChange={this.handleKmChange}/>
      </>
    )
  }
}

export default AddSessionRunning;
