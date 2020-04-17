import React from 'react';
import { SingleDatePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import 'moment/locale/fr';
import SessionFillerRunningDisplayer from './SessionFillerRunningDisplayer';

class AddSessionRunningDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      // Trigger form
      displayForm,
      buttonContent,
      handleClickNewSession,
      // Date picker
      sessionDate,
      handleDateChanged,
      focused,
      handleDateFocus,
      // form handlers
      exerciseNbr,
      exercisesSession,
      handleChangeNumberInput,
      // table form handlers
      exerciseNames,
      handleChooseExercice,
      handleKmChange,
      handleTimeInput,
      // Create session
      addSessionRunning
    } = this.props;

    return (
      <>
        <button className="emphasize" onClick={handleClickNewSession}>{buttonContent}</button>
        <div className={displayForm}>
          <fieldset className="flex">
              <SingleDatePicker date={sessionDate} 
                                onDateChange={handleDateChanged} 
                                focused={focused} 
                                onFocusChange={handleDateFocus}
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                                id="1"/>
              <h4>Nombre d'exercices</h4>
              <label className="half fourth-1000">
                <input type="number" 
                      name="exerciseNbr" 
                      value={exerciseNbr}
                      onChange={handleChangeNumberInput}/>
              </label>
              <div className="table-wrapper">
                <div className="table-scroll">
                  <SessionFillerRunningDisplayer exercisesSession={exercisesSession}
                                                exerciseNames={exerciseNames}
                                                handleChooseExercice={handleChooseExercice}
                                                handleKmChange={handleKmChange}
                                                handleTimeInput={handleTimeInput}/>
                </div>
              </div>
          </fieldset>
          <button className="emphasize" onClick={addSessionRunning}>Créer la séance</button>
        </div>
      </>
    )
  }
}

export default AddSessionRunningDisplayer;