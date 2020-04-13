import React from 'react';
import Select from '../../../../Components/Select';

class SessionFillerDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      circuitNbr,
      exerciseValues,
      handleRepetChange,
      exerciseChoosed,
      exerciseNames,
      handleChooseExercise,
      exerciseDefaults } = this.props;

    const arrayCircuit = Array(+circuitNbr).fill(1);

    return (
      <>
        <table>
          <thead>
            <tr>
              <th  className="emphasize min-w-200">
                Exercise
              </th>
              {arrayCircuit.map(( _ , idx) => <th className="emphasize">
                {++idx}
              </th>)}
            </tr>
          </thead>
          <tbody>
            {exerciseValues && exerciseValues.map((exercise, idxEx) => <tr>
              <td>
                <label>
                  <Select handleOptionChoosed={handleChooseExercise(idxEx)}
                          optionValues={["notChoosed"].concat(exerciseNames)}
                          choosedValue={exerciseChoosed[idxEx]}
                          textDisplayOptions={["Exercice"].concat(exerciseNames)}/>
                </label>
              </td>
              {exercise.map((repetNbr, idxRepet) => <td>
                <input type="number" onChange={handleRepetChange(idxEx, idxRepet)} value={repetNbr} /> 
              </td>)}
            </tr>)}
          </tbody>
        </table>
      </>
    )
  }
}

export default SessionFillerDisplayer;
