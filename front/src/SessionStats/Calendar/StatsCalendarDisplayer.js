import React from "react";
import componentUtils from "../../utils/componentUtils";

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
      </>
    );
  }
}

export default StatsCalendarDisplayer;
