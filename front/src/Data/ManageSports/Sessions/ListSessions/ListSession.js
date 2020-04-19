import React from 'react';
import ListSessionDisplayer from './ListSessionDisplayer';
import globalUtils from '../../../../utils/globalUtils';

class ListSession extends React.Component {
  state = {
    sports: undefined
  }

  componentDidMount() {
    let sportsData = globalUtils.getAllExercices();

    this.setState({
      sports: sportsData
    })
  }

  render() {
    return (
      <>
        <ListSessionDisplayer/>
      </>
    )
  }
}

export default ListSession;
