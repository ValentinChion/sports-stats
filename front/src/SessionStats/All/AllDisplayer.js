import React from 'react';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';
import constants from '../../utils/constants/weight';

class AllDisplayer extends React.Component {
  state = {
    
  }

  render() {
    let {
      weightCount,
      weightTime,
      runningCount,
      basketball
    } = this.props;

    if (weightCount) {
      const addToTime = constants.EXERCICES_TO_INCLUDE.reduce((acc, curr) => {
        acc[curr] = weightCount[curr];
        return acc
      }, {});
      weightTime = {
        ...addToTime,
        ...weightTime
      }
    }
    return (
      <>
        {
          /*<NumbersInJSONDisplayer title="RÉPÉTITIONS EFFECTUÉES"
                                colorClassName="emphasize"
                                numbers={weightCount}/>*/
        }
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
