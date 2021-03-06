import React from "react";
import MonthDisplayer from "./Month/MonthDisplayer";
import WeekDisplayer from "./Week/WeekDisplayer";

class DurationsDisplayer extends React.Component {
  state = {};

  render() {
    const { months, weeks, minToShow } = this.props;
    return (
      <>
        <h3>STATISTIQUES DÉTAILLÉES</h3>
        <section className="flex grow">
          <div className="tabs three">
            <input id="tab-month" type="radio" name="tabdurations" defaultChecked />
            <label className="pseudo button toggle" htmlFor="tab-month">
              Mois
            </label>
            <input id="tab-week" type="radio" name="tabdurations" />
            <label className="pseudo button toggle" htmlFor="tab-week">
              Semaine
            </label>
            <input id="tab-year" type="radio" name="tabdurations" />
            <label className="pseudo button toggle" htmlFor="tab-year">
              Année
            </label>
            <div className="row">
              <div className="tab-container">{months && <MonthDisplayer months={months} minToShow={minToShow} />}</div>
              <div className="tab-container">
                {weeks && <WeekDisplayer weeks={weeks} minToShow={minToShow} />}
              </div>
              <div className="tab-container">L'application n'a pas encore un an !</div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default DurationsDisplayer;
