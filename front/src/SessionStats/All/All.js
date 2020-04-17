import React from 'react';
import AllDisplayer from './AllDisplayer';
import constants from '../../utils/constants/global';
import storageHandler from '../../utils/localStorage/storage';
import moment from 'moment';

class All extends React.Component {
  state = {
    repetitionsByExercise: undefined,
    weightTraining: undefined
  }

  componentDidMount() {
    const countRepByEx = (accumulator, current) => {
      current = current.exercises.reduce((accTraining, curTraining) => {
        const repCount = curTraining.training.reduce((accRep, curRep) => (+curRep) + (+accRep));
        if (accTraining.hasOwnProperty(curTraining.name)) {
          accTraining[curTraining.name] += repCount
          return accTraining
        } else {
          return {
            ...accTraining,
            [curTraining.name] : repCount
          }
        }
      }, {})

      if (Object.keys(accumulator).length !== 0) {
        for (const exName in current) {
          if (current.hasOwnProperty(exName)) {
            const el = current[exName];
            if (accumulator.hasOwnProperty(exName)) {
              accumulator[exName] += el
            } else {
              accumulator = {
                ...accumulator,
                [exName]: el
              }
            }
            
          }
        }
        return accumulator;
      } else return current;
    }

    let count;
    for (let i = 0; i < constants.AVAILABLE_SPORTS.length; i++) {
      const element = constants.AVAILABLE_SPORTS[i];
      const sportData = storageHandler.get(element);
      if (!storageHandler.isError(sportData)
          && sportData[0].hasOwnProperty("sessions")) {
        // TODO --> Make running data readable
        if (element !== "running") {
          let count = sportData[0].sessions.reduce(countRepByEx, {});

          sportData[0].exercises.map((exercise) => {
            if (!count.hasOwnProperty(exercise.name)) {
              count[exercise.name] = 0
            } else {
              if (exercise.type === "Temps") {
                count[exercise.name] = moment.utc(moment.duration(count[exercise.name], "seconds").asMilliseconds()).format("HH:mm:ss");
              }
            }
            return "";
          })
        }
      }

      //TODO --> Check if below works when 2 sports are coded
      if (count && this.state.repetitionsByExercise) {
        count = {
          ...count,
          ...this.state.repetitionsByExercise
        }
      }
      this.setState({
        [element]: sportData[0],
        repetitionsByExercise: count
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
        <AllDisplayer repetitionsByExercise={this.state.repetitionsByExercise}
                      weightTraining={this.state.weightTraining}/>
      </>
    )
  }
}

export default All;
