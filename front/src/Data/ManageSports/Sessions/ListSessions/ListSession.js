import React from 'react';
import ListSessionDisplayer from './ListSessionDisplayer';
import globalUtils from '../../../../utils/globalUtils';
import constants from '../../../../utils/constants/global';

class ListSession extends React.Component {
  state = {
    sports: undefined
  }

  componentDidMount() {
    let sportsData = globalUtils.getAllExercices();

    let root = {
      "root": {
        "name": "Séances",
        "children": []
      }
    }

    console.log(Object.entries(sportsData));
    Object.entries(sportsData).map((sport) => {
      let [
        key,
        value
      ] = sport;

      let nodeSport = {
        "name": key,
        children: [{
          "name": constants.SPORTS_NAMES_UNSLUG[key],
          "date": "",
          "loc": 80
        }]
      }

      value.sessions && value.sessions.map((session, idx) => {
        nodeSport.children.push({
          "name": "" + idx,
          "date": session.date,
          "loc": 60,
          "session": session.exercises
        })
      })

      root.root.children.push(nodeSport)
      return;
    })

    this.setState({
      sports: sportsData,
      root
    })
  }

  displayLabelSessions(e) {
    if (e.hasOwnProperty("session")) {

    } else return e.name
  }

  render() {
    return (
      <><p>Wesh</p>
        <ListSessionDisplayer root={this.state.root}/>
      </>
    )
  }
}

export default ListSession;
