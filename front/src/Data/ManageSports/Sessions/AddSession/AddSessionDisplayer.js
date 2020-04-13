import React from 'react';
import { SingleDatePicker } from 'react-dates';
import SessionFillerDisplayer from './SessionFillerDisplayer';

class AddSessionDisplayer extends React.Component {

  render() {
    const {
      displayForm,
      buttonContent,
      handleClickNewSession,
      handleChangeNumberInput,
      exercises,
      sessionDate,
      handleDateChanged,
      handleChooseExercise,
      exerciseChoosed,
      exerciseNbr,
      circuitNbr,
      exerciseValues,
      handleRepetChange,
      handleAddSession,
      focused,
      handleDateFocus
    } = this.props;

    const exerciseNames = exercises && exercises.map(exercise => exercise.name);

    return (
      <>
        <button className="emphasize" onClick={handleClickNewSession}>{buttonContent}</button>
        <div className={displayForm}>
          <fieldset className="flex">
            <SingleDatePicker date={sessionDate} 
                              onDateChange={handleDateChanged} 
                              focused={focused} 
                              onFocusChange={handleDateFocus} 
                              id="1"/>
            <h4>Nombre d'exercices</h4>
            <label className="half fourth-1000">
              <input type="number" 
                     name="exerciseNbr" 
                     value={exerciseNbr}
                     onChange={handleChangeNumberInput}/>
            </label>
            <h4>Nombre de circuit réalisés</h4>
            <label className="half fourth-1000">
              <input type="number" 
                     name="circuitNbr" 
                     value={circuitNbr}
                     onChange={handleChangeNumberInput}/>
            </label>
            {exerciseNbr > 0 && <SessionFillerDisplayer circuitNbr={circuitNbr}
                                                        exerciseValues={exerciseValues}
                                                        exerciseChoosed={exerciseChoosed}
                                                        handleRepetChange={handleRepetChange}
                                                        exerciseChoosed={exerciseChoosed}
                                                        exerciseNames={exerciseNames}
                                                        handleChooseExercise={handleChooseExercise}/>}
            {exerciseNbr > 0 && <button onClick={handleAddSession} className="emphasize">Ajouter ma séance</button>}
          </fieldset>
        </div>
      </>
    )
  }
}

export default AddSessionDisplayer;
