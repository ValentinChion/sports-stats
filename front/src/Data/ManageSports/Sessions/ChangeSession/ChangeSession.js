import React from 'react';
import ChangeSessionDisplayer from './ChangeSessionDisplayer';

class ChangeSession extends React.Component {
  state = {
    
  }

  render() {
    const {session} = this.props;
    
    return (
      <>
        <ChangeSessionDisplayer session={session}/>
      </>
    )
  }
}

export default ChangeSession;
