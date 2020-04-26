import React from "react";
import ListSessionDisplayer from "./ListSessionDisplayer";
import globalUtils from "../../../../utils/globalUtils";
import constants from "../../../../utils/constants/global";
import moment from "moment";
import runningUtils from "../../../../utils/runningUtils";

class ListSession extends React.Component {
  state = {
    sports: undefined,
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
        const sessionsByDate = value.sessions.sort((b, a) => moment(a.date).diff(b.date));
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
              session: session.exercises,
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
                session: session.exercises,
              },
            ];
          }

          console.log(idx, sessionsByDate.length)

          if (idx + 1 === sessionsByDate.length){
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

    // TODO --> Add tooltip fort weighTraining
    const data = e.data;
    if (data.hasOwnProperty("session") && data.hasOwnProperty("currSport")) {
      if (data.currSport === "running") {
        let tooltipContent = (
          <span className="tooltip-tree-map">
            km : temps <br />{" "}
            {data.session[0].kmsTimes.map((time, currKm, kmsTimes) => (
              <>
                {++currKm === kmsTimes.length ? parseFloat((data.session[0].kms % 1).toFixed(2)) : currKm} : {globalUtils.formatDuration(+time)}
                <br />
              </>
            ))}
          </span>
        );
        return tooltipContent;
      } else {
      }
    }
    console.log(e);
  };

  // Onclick on session to add a modal to change it :)

  render() {
    return (
      <>
        <p>Wesh</p>
        <ListSessionDisplayer root={this.state.root} customToolTipTree={this.customToolTipTree} />
      </>
    );
  }
}

export default ListSession;
