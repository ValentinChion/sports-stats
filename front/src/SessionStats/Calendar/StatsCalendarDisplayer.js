import React from "react";
import componentUtils from "../../utils/componentUtils";
import { ResponsiveCalendar } from '@nivo/calendar';
import StatsByDurationDisplayer from './StatsByDurationDisplayer';

class StatsCalendarDisplayer extends React.Component {
  state = {};

  render() {
    const { sessions } = this.props;

    const dataForCalendar = {
      data: sessions
    }
    return (
      <>
        <h3>CALENDRIER</h3>
        {sessions && <div className="calendar-container">{componentUtils.createCalendar(dataForCalendar)}</div>}
        <StatsByDurationDisplayer sessions={sessions}/>
      </>
    );
  }
}

export default StatsCalendarDisplayer;
