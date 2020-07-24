import React from 'react';
import BasketBallDisplayer from './BasketBallDisplayer';
import storageHandler from '../../utils/localStorage/storage';

class BasketBall extends React.Component {
  state = {
    displayForm: "hidden",
    buttonContent: "Remplir une nouvelle séance",
    sessionDate: undefined,
    focused: true,
    duration: 0,
    intensity: 0
  }

  handleDateChanged = (date) => {
    this.setState({sessionDate: date});
  }

  handleDateFocus = (focused) => {this.setState({focused: focused.focused});}

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

  handleInputInteger = (e) => {
    this.setState({
      [e.target.name]: +e.target.value
    })
  }

  handleCreateSession = (e) => {
    const {
      sessionDate,
      duration,
      intensity
    } = this.state

    let session = {
      sessionDate,
      duration,
      intensity
    }

    const sportContainer = storageHandler.get('basketball');
    if (!storageHandler.isError(sportContainer)) {
      let sessions;
      if (sportContainer[0].hasOwnProperty("sessions")) {
        sessions = sportContainer[0].sessions;
        sessions.push(session);
      } else {
        sessions = [session]
      }
      sportContainer[0].sessions = sessions;
      const result = storageHandler.set('basketball', sportContainer[0]);
      if (storageHandler.isError(result)) console.log(result);
    } else console.log(sportContainer);
  }


  render() {
    return (
      <>
        <BasketBallDisplayer // Handle displaying form 
                             displayForm={this.state.displayForm}
                             buttonContent={this.state.buttonContent}
                             handleClickNewSession={this.handleClickNewSession}
                             // Handle data form
                             handleInputInteger={this.handleInputInteger}
                             duration={this.state.duration}
                             intensity={this.state.intensity}
                             handleCreateSession={this.handleCreateSession}
                             // Handle date picker
                             sessionDate={this.state.sessionDate} 
                             focused={this.state.focused}
                             handleDateFocus={this.handleDateFocus}
                             handleDateChanged={this.handleDateChanged}/>
      </>
    )
  }
}

export default BasketBall;
