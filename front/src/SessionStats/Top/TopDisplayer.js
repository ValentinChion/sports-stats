import React from 'react';
import NumbersInJSONDisplayer from '../../Components/NumbersInJSONDisplayer';

class TopDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const { weightTrainingMaxs } = this.props;
    return (
      <>
        <NumbersInJSONDisplayer title="MEILLEUR RÉPÉTITIONS EN UNE SÉANCE"
                                numbers={weightTrainingMaxs} 
                                colorClassName="emphasize"/>
      </>
    )
  }
}

export default TopDisplayer;
