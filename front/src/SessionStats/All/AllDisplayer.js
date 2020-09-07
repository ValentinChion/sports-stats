import React from 'react';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';
import runningUtils from '../../utils/runningUtils';

class AllDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      weightCount,
      weightTime,
      runningCount,
      basketball
    } = this.props;

    return (
      <>
        <NumbersInJSONDisplayer title="RÉPÉTITIONS EFFECTUÉES"
                                colorClassName="emphasize"
                                numbers={weightCount}/>
        <NumbersInJSONDisplayer title="MUSCULATION"
                                colorClassName="emphasize"
                                numbers={weightTime}/>
        {runningCount && <NumbersInJSONDisplayer title="DISTANCE PARCOURUE"
                                                 colorClassName="emphasize"
                                                 numbers={runningCount.tots}/>}
        {runningCount && <NumbersInJSONDisplayer title="DISTANCE PARCOURUE PAR EXERCICE"
                                                 colorClassName="emphasize"
                                                 unit="km"
                                                 numbers={runningCount.totsByEx}/>}
        {basketball && <NumbersInJSONDisplayer title="BASKET-BALL"
                                               colorClassName="emphasize"
                                               numbers={basketball} />}
        
      </>
    )
  }
}

export default AllDisplayer;
