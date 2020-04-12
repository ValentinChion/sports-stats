import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListExercisesDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const { 
      exercises,
      delExercise } = this.props;
    return (
      <>
      <h3>Liste des exercices</h3>
      <table className="primary">
        <thead>
          <tr>
            <th>
              Nom
            </th>
            <th>
              Type d'exercice
            </th>
            <th>
              Défault
            </th>
            <th>
              Supprimer ?
            </th>
          </tr>
        </thead>
        <tbody>
          {exercises && exercises.map((exercise, idx) => <tr key={exercise.name}>
            <td>{exercise.name}</td>
            <td>{exercise.type}</td>
            <td className="center">{exercise.default}</td>
            <td className="center"><button onClick={delExercise(idx)} className="pseudo small center"><FontAwesomeIcon icon="trash-alt" /></button></td>
          </tr>)}
        </tbody>
      </table>
      </>
    )
  }
}

export default ListExercisesDisplayer;
