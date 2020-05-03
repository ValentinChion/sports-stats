import React, { Fragment } from "react";
import constants from "../../../utils/constants/global";
import ListByDate from '../../../Components/ListByDate';

class MonthDisplayer extends React.Component {
  state = {};

  render() {
    let { months, minToShow } = this.props;

    return (
      <>
        <ListByDate isMonth={true}
                    minToShow={minToShow}
                    dataByDuration={months}/>
      </>
    );
  }
}

export default MonthDisplayer;
