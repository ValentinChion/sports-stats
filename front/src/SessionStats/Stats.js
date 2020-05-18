import React from 'react';
import All from './All/All';
import Top from './Top/Top';
import Durations from './Durations/Durations';
import StatsCalendar from './Calendar/StatsCalendar';

class Stats extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
        <All/>
        <Top/>
        <Durations/>
        <StatsCalendar/>
      </>
    )
  }
}

export default Stats;
