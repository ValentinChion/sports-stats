import React from 'react';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';

class AllDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      weightCount,
      weightTraining,
      runningCount,
    } = this.props;

    return (
      <>
        <NumbersInJSONDisplayer title="RÉPÉTITIONS EFFECTUÉES"
                                colorClassName="emphasize"
                                numbers={weightCount}/>
        {runningCount && <NumbersInJSONDisplayer title="DISTANCE PARCOURUE"
                                                 colorClassName="emphasize"
                                                 numbers={runningCount.tots}/>}
        {runningCount && <NumbersInJSONDisplayer title="DISTANCE PARCOURUE PAR EXERCICE"
                                                 colorClassName="emphasize"
                                                 unit="km"
                                                 numbers={runningCount.totsByEx}/>}
        
      </>
    )
  }
}

export default AllDisplayer;
