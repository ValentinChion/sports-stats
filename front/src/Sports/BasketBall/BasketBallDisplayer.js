import React from 'react';
import { SingleDatePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import 'moment/locale/fr';

class BasketBallDisplayer extends React.Component {
  state = {
    
  }

  render() {

    const {
      sessionDate,
      handleDateChanged,
      focused,
      handleDateFocus,
      displayForm,
      buttonContent,
      handleClickNewSession,
      handleInputInteger,
      duration,
      intensity,
      handleCreateSession
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
            <h4>Temps passé <span class="label warning">secondes</span></h4>
            <label className="half fourth-1000">
              <input type="number" 
                     name="duration" 
                     value={duration}
                     onChange={handleInputInteger}/>
            </label>
            <h4>Intensité <span class="label warning">sur 10</span></h4>
            <label className="half fourth-1000">
              <input type="number" 
                     name="intensity" 
                     value={intensity}
                     onChange={handleInputInteger}/>
            </label>
            <button className="emphasize" onClick={handleCreateSession}>Créer la séance</button>
          </fieldset>
        </div>
      </>
    )
  }
}

export default BasketBallDisplayer;
