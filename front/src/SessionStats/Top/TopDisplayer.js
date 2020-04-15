import React from 'react';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';

class TopDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const { topByExercise } = this.props;
    return (
      <>
        <NumbersInJSONDisplayer title="MEILLEUR RÉPÉTITIONS EN UNE SÉANCE"
                                numbers={topByExercise} />
      </>
    )
  }
}

export default TopDisplayer;
