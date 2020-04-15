import React from 'react';
import StatNumber from '../../Components/StatNumber';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';

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
        <NumbersInJSONDisplayer title="RÉPÉTITIONS EFFECTUÉES"
                                numbers={repetitionsByExercise}/>
      </>
    )
  }
}

export default AllDisplayer;
