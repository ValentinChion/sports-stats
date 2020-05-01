import React from "react";
import ListSessionDisplayer from "./ListSessionDisplayer";
import globalUtils from "../../../../utils/globalUtils";
import constants from "../../../../utils/constants/global";
import moment from "moment";
import runningUtils from "../../../../utils/runningUtils";

class ListSession extends React.Component {
  state = {
    sports: undefined,
    currSession: undefined,
  };

  componentDidMount() {
    let sportsData = globalUtils.getAllExercices();

    let root = {
      root: {
        name: "Séances",
        children: [],
      },
    };

    Object.entries(sportsData).map((sport, idxSp) => {
      let [key, value] = sport;

      let nodeSport = {
        name: key,
        children: [
          {
            name: "1000" + idxSp,
            toDisplay: constants.SPORTS_NAMES_UNSLUG[key],
            date: "",
            loc: 100,
          },
        ],
      };

      if (value.sessions) {
        const sessionsByDate = globalUtils.sortByDate(value.sessions);
        let startOfWeek;
        let endOfWeek;
        let childrens = [];

        sessionsByDate.map((session, idx) => {
          let toDisplay = (
            <span key={"" + idxSp + idx}>
              {key === "running" &&
                session.exercises.map((exercise) => (
                  <>
                    {exercise.name !== "Récupération" ? (
                      <>
                        {exercise.name}
                        <br /> {exercise.kms} km <br /> {globalUtils.formatDuration(runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms))}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ))}
            </span>
          );

          if (!startOfWeek) {
            startOfWeek = moment(session.date).startOf("week");
            endOfWeek = moment(session.date).endOf("week");
          }

          if (moment(session.date).isBetween(startOfWeek, endOfWeek))
            childrens.push({
              name: "000" + idxSp + idx,
              toDisplay: toDisplay,
              date: moment(session.date).format("DD MMMM YYYY"),
              loc: 80,
              currSport: key,
              session: session,
            });
          else {
            nodeSport.children.push({
              name: "Semaine du " + startOfWeek.format("DD MMMM"),
              children: childrens,
            });

            startOfWeek = moment(session.date).startOf("week");
            endOfWeek = moment(session.date).endOf("week");
            childrens = [
              {
                name: "" + idx,
                toDisplay: toDisplay,
                date: moment(session.date).format("DD MMMM YYYY"),
                loc: 80,
                currSport: key,
                session: session,
              },
            ];
          }

          if (idx + 1 === sessionsByDate.length) {
            nodeSport.children.push({
              name: "Semaine du " + startOfWeek.format("DD MMMM"),
              children: childrens,
            });
          }
        });
      }

      root.root.children.push(nodeSport);
      return "";
    });

    this.setState({
      sports: sportsData,
      root,
    });
  }

  displayLabelSessions(e) {
    if (e.hasOwnProperty("session")) {
    } else return e.name;
  }

  customToolTipTree = (e) => {
    const data = e.data;
    if (data.hasOwnProperty("session") && data.hasOwnProperty("currSport")) {
      let tooltipContent = (
        <span className="tooltip-tree-map">
          {data.currSport === "running" ? (
            <>
              km : temps
              <br />
            </>
          ) : (
            ""
          )}{" "}
          {data.currSport === "running" &&
            data.session.exercises[0].kmsTimes.map((time, currKm, kmsTimes) => (
              <>
                {++currKm === kmsTimes.length ? parseFloat((data.session.exercises[0].kms % 1).toFixed(2)) : currKm} : {globalUtils.formatDuration(+time)}
                <br />
              </>
            ))}
          {data.currSport === "weightTraining" &&
            data.session.exercises.map((exercice) => (
              <>
                {exercice.name}
                <br />
              </>
            ))}
        </span>
      );
      return tooltipContent;
    }
    return undefined;
  };

  onClickTree = (e) => {
    this.setState({
      currSession: e.data.session
    });
  };

  render() {
    return (
      <>
        <ListSessionDisplayer root={this.state.root} customToolTipTree={this.customToolTipTree} onClickTree={this.onClickTree} currSession={this.state.currSession}/>
      </>
    );
  }
}

export default ListSession;
