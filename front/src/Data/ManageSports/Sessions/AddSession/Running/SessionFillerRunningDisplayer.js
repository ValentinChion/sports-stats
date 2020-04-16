import React from 'react';
import Select from '../../../../../Components/Select';

class SessionFillerRunningDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      exercisesSession,
      exerciseNames,
      handleChooseExercice,
      handleKmChange
    } = this.props;

    const sizeArray = Math.ceil(
      Math.max(...exercisesSession.map(exercise => exercise.kms))
    );
    const arrayHeaderMaker = exercisesSession.length ? [...Array(sizeArray)] : "";

    return (
      <>
        <table>
          <thead>
            <tr>
              <th className="emphasize min-w-200">
                Exercice
              </th>
              <th className="emphasize min-w-200">
                Kms parcourus
              </th>
              {arrayHeaderMaker && arrayHeaderMaker.map((_, idxKm) => idxKm + 1 === sizeArray ? <th className="emphasize min-w-150">Dernier km</th>: <th className="emphasize">Km {++idxKm}</th>)}
            </tr>
          </thead>
          <tbody>
            {exercisesSession.map((exercise, idxEx) => 
            <tr>
                <td>
                  <label>
                    <Select handleOptionChoosed={handleChooseExercice(idxEx)}
                            optionValues={["notChoosed"].concat(exerciseNames)}
                            choosedValue={exercisesSession[idxEx].name}
                            textDisplayOptions={["Exercice"].concat(exerciseNames)}/>
                  </label>
                </td>
                <td>
                  <input type="number" onChange={handleKmChange(idxEx)} value={exercisesSession[idxEx].kms} /> 
                </td>
                {exercisesSession[idxEx].kmsTimes.map( (kmTime) => 
                  <td>
                    <input type="number" onChange={handleKmChange(idxEx)} value={kmTime} />
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </>
    )
  }
}

export default SessionFillerRunningDisplayer;
