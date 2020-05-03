import React, { Fragment } from "react";
import constants from "../utils/constants/global";

class ListByDate extends React.Component {
  state = {};

  componentDidMount() {
    const { minToShow } = this.props;

    this.setState({
      minToShow,
    });
  }

  handleShowMore = () => {
    this.setState({ minToShow: 0 });
  };

  render() {
    // If not by month, then by weeks.
    let { dataByDuration, isMonth } = this.props;
    const durationName = isMonth ? "month" : "week";
    const lengthDataDuration = dataByDuration.length;
    dataByDuration = this.state.minToShow ? dataByDuration.slice(0, this.state.minToShow) : dataByDuration;
    return (
      <>
        {dataByDuration &&
          dataByDuration.map((duration) => (
            <Fragment key={duration[durationName]}>
              <h3>{duration[durationName].toUpperCase()}</h3>
              {Object.keys(duration).map((key) => {
                if (key === durationName) return "";
                else
                  return (
                    <article class="card" key={key}>
                      <header>
                        <h3>{constants.SPORTS_NAMES_UNSLUG[key]}</h3>
                      </header>
                      <section className="with-padding-bottom">
                        <div className={key === "weightTraining" ? "grid-text-with-title-container" : ""}>
                          {duration[key].map((exercise) => {
                            if (key === "running")
                              return (
                                <Fragment key={exercise.name}>
                                  <h4>{exercise.name}</h4>
                                  <div className="grid-text-with-title-container">
                                    <div className="grid-title">Distance</div>
                                    <div className="grid-title">Temps</div>
                                    <div className="grid-title">Allure</div>
                                    <div className="grid-text">{exercise.kms.toFixed(2)} kms</div>
                                    <div className="grid-text">{exercise.time}</div>
                                    <div className="grid-text">{exercise.allure}</div>
                                  </div>
                                </Fragment>
                              );
                            else
                              return (
                                <Fragment key={exercise.name}>
                                  <div>
                                    <div className={exercise.name.length > 16 ? "grid-title has-sm-text" : "grid-title"}>{exercise.name}</div>
                                    <div className="grid-text">{exercise.repets}</div>
                                  </div>
                                </Fragment>
                              );
                          })}
                        </div>
                      </section>
                    </article>
                  );
              })}
            </Fragment>
          ))}
        {lengthDataDuration > this.state.minToShow && this.state.minToShow ? (
          <button onClick={this.handleShowMore} className="emphasize">
            Tout afficher
          </button>
        ) : ""}
      </>
    );
  }
}

export default ListByDate;
