import React from 'react';
import AllDisplayer from './AllDisplayer';
import constants from '../../utils/constants/global';
import storageHandler from '../../utils/localStorage/storage';
import moment from 'moment';
import weightTrainingUtils from '../../utils/weightTrainingUtils';
import runningUtils from '../../utils/runningUtils';
import basketBallUtils from '../../utils/basketballUtils';
import globalUtils from '../../utils/globalUtils';

class All extends React.Component {
  state = {
    weightCount: undefined,
    weightTraining: undefined,
    runningCount: undefined,
    basketball: undefined
  }

  componentDidMount() {
    let count;
    let name;
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData)
          && sportData[0].hasOwnProperty("sessions")) {
        if (element === "weightTraining") {
          name = "weightCount"; 
          count = weightTrainingUtils.count(sportData[0]);
        } else if (element === "running") {
          name = "runningCount";
          count = {
            tots: runningUtils.countKmsAndTime(sportData[0]),
            // TODO --> Code Times
            totsByEx: runningUtils.countKmsAndTimeByEx(sportData[0])
          }
        } else {
          name = "basketball";
          count = {
            'Temps Passé': globalUtils.formatDuration(basketBallUtils.countTime(sportData[0])),
            'Intensité Moyenne': basketBallUtils.averageIntensity(sportData[0])  
          }
        }
      }

      if (count && name && this.state.repetitionsByExercise) {
        count = {
          ...count,
          ...this.state.repetitionsByExercise
        }
      }
      this.setState({
        [element]: sportData[0],
        [name]: count
      })
    }
    
    document.addEventListener('storageSet', this.handleNewSession, false);
  }

  handleNewSession = (e) => {
    this.setState({
      [e.key]: JSON.parse(e.value).values[0]
    });
  }


  render() {
    return (
      <>
        <AllDisplayer weightCount={this.state.weightCount}
                      weightTraining={this.state.weightTraining}
                      runningCount={this.state.runningCount}
                      basketball={this.state.basketball}/>
      </>
    )
  }
}

export default All;
