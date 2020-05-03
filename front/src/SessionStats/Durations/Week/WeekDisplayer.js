import React from "react";
import ListByDate from "../../../Components/ListByDate";

class WeekDisplayer extends React.Component {
  state = {};

  render() {
    const { weeks, minToShow } = this.props;
    return (
      <>
        <ListByDate dataByDuration={weeks} isMonth={false} minToShow={minToShow} />
      </>
    );
  }
}

export default WeekDisplayer;
