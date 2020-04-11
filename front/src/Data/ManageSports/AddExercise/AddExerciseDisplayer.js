import React from 'react';
import Select from '../../../Components/Select';
import constants from '../../../utils/constants/global';

class AddExerciseDisplayer extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Ajouter un exercice",
    exerciseType: "notChoosed"
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

  render() {
    return (
      <>
        <button onClick={this.handleClickAddExercise}>{this.state.buttonContent}</button>
        <div className={this.state.displayForm}>
          <fieldset className="flex">
            <label><input type="name" placeholder="Nom de l'exercise"></input></label>
            <label><Select handleOptionChoosed={this.handleExerciseType}
                  optionValues={["notChoosed"].concat(constants.WEIGHT_TRAINING.TYPES)}
                  choosedValue={this.state.exerciseType}
                  textDisplayOptions={["Type d'exercise"].concat(constants.WEIGHT_TRAINING.TYPES)}/></label>
            <label><input type="defaultValue" placeholder="Valeur par défault"></input></label>
          </fieldset>
        </div>
      </>
    )
  }
}

export default AddExerciseDisplayer;
