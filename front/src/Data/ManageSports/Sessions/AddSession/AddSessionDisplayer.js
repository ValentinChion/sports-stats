import React from 'react';
import TextInput from '../../../../Components/TextInput';
import Select from '../../../../Components/Select';
import SessionFillerDisplayer from './SessionFillerDisplayer';

class AddSessionDisplayer extends React.Component {

  render() {
    const {
      displayForm,
      buttonContent,
      handleClickNewSession,
      handleChangeNumberInput,
      exercises,
      handleChooseExercise,
      exerciseChoosed,
      exerciseNbr,
      circuitNbr,
      exerciseValues,
      handleRepetChange
    } = this.props;

    const exerciseNames = exercises && exercises.map(exercise => exercise.name)

    return (
      <>
        <button className="emphasize" onClick={handleClickNewSession}>{buttonContent}</button>
        <div className={displayForm}>
          <fieldset className="flex">
            <h4>Nombre d'exercices</h4>
            <label>
              <input type="number" 
                    name="exerciseNbr" 
                    value={exerciseNbr}
                    onChange={handleChangeNumberInput}/>
            </label>
            <h4>Nombre de circuit réalisés</h4>
            <label>
              <input type="number" 
                     name="circuitNbr" 
                     value={circuitNbr}
                     onChange={handleChangeNumberInput}/>
            </label>
            {exerciseNbr > 0 && <SessionFillerDisplayer exerciseNbr={exerciseNbr}
                                                    circuitNbr={circuitNbr}
                                                    exerciseValues={exerciseValues}
                                                    exerciseChoosed={exerciseChoosed}
                                                    handleRepetChange={handleRepetChange}
                                                    exerciseChoosed={exerciseChoosed}
                                                    exerciseNames={exerciseNames}
                                                    handleChooseExercise={handleChooseExercise}/>}
            {exerciseNbr > 0 && <button className="emphasize">Ajouter ma séance</button>}
          </fieldset>
        </div>
      </>
    )
  }
}

export default AddSessionDisplayer;
