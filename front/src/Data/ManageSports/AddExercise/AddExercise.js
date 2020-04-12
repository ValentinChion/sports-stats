import React from 'react';
import AddExerciseDisplayer from './AddExerciseDisplayer';
import storageHandler from '../../../utils/localStorage/storage';

class AddExercise extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Ajouter un exercice",
    exerciseType: "notChoosed",
    nameError: false,
    typeError: false
  }

  handleClickAddExercise = (e) => {
    let triggerForm;
    let triggerButton;
    if (this.state.displayForm) {
      triggerForm = ""
      triggerButton = "Annuler l'ajout d'exercice"
    } else {
      triggerForm = "hidden"
      triggerButton = "Ajouter un exercice"
    }

    this.setState({
      displayForm: triggerForm,
      buttonContent: triggerButton
    })
  }

  handleExerciseType = (e) => {
    this.setState({
      exerciseType: e.target.value
    })
  }

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addExerciseType = () => {
    const sportType = this.props.sportType;
    const dataExercise = {
      name: this.state.exerciseName,
      default: this.state.defaultValue,
      type: this.state.exerciseType
    }

    let result;
    if (storageHandler.exists(sportType)) {
      let sportData = storageHandler.get(sportType)[0];
      let errorTrigger = false;
      if (sportData.exercises.some(exercise => dataExercise.name === exercise.name)) {
        this.setState({
          nameError: true
        });
        errorTrigger = true;
      } else if (this.state.nameError) {
        this.setState({
          nameError: false
        });
      }
      
      if (dataExercise.type === "notChoosed") {
        this.setState({
          typeError: true
        });
        errorTrigger = true;
      } else if (this.state.typeError) {
        this.setState({
          typeError: false
        });
      }
      if (errorTrigger) return !errorTrigger;

      sportData.exercises.push(dataExercise);
      result = storageHandler.set(sportType, sportData);
    } else {
      result = storageHandler.set(sportType, {
        exercises : [dataExercise]
      });
    }

    storageHandler.isError(result) && console.log(result);
  }

  render() {
    return (
      <>
        <AddExerciseDisplayer displayForm={this.state.displayForm}
                              buttonContent={this.state.buttonContent}
                              exerciseType={this.state.exerciseType}
                              optionsExerciseTypes={this.props.exerciseTypes}
                              handleClickAddExercise={this.handleClickAddExercise}
                              handleExerciseType={this.handleExerciseType}
                              handleChangeInput={this.handleChangeInput}
                              nameError={this.state.nameError}
                              typeError={this.state.typeError}
                              addExerciseType={this.addExerciseType}/>
      </>
    )
  }
}

export default AddExercise;
