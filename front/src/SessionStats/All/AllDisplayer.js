import React from 'react';
import StatNumber from '../../Components/StatNumber';

class AllDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      repetitionsByExercise,
      weightTraining
    } = this.props;

    return (
      <>
        <h3>RÉPÉTITIONS EFFECTUÉES</h3>
        <div className="flex two three-600 four-800 six-1200 center">
          {repetitionsByExercise && Object.entries(repetitionsByExercise).map(exercise => 
            <StatNumber title={exercise[0]}
                        key={exercise[0]}
                        number={exercise[1]} />
          )}
        </div>
      </>
    )
  }
}

export default AllDisplayer;
