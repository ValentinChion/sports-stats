import React from 'react';
import constants from '../../utils/constants/global';
import stringUtils from '../../utils/string';
import Running from './Running/Running';
import WeightTraining from './WeightTraining/WeightTraining';
import BasketBall from './BasketBall/BasketBall';
import Select from '../../Components/Select';

class ManageSportsDisplayer extends React.Component {
  state = {
    choosedSport: "notChoosed"
  }

  handleOptionChoosed = (e) => {
    this.setState({
      choosedSport: e.target.value
    })
  }

  sportsComponents = {
    "running": <Running />,
    "weightTraining": <WeightTraining />,
    "basketball": <BasketBall />
  }

  render() {
    let sportComponent = this.state.choosedSport === "notChoosed" ? <></> : this.sportsComponents[this.state.choosedSport];
    return (
      <>
        <div>
          <Select handleOptionChoosed={this.handleOptionChoosed}
                  optionValues={["notChoosed"].concat(constants.AVAILABLE_SPORTS)}
                  choosedValue={this.state.choosedSport}
                  textDisplayOptions={["Choisissez votre sport..."].concat(
                    constants.AVAILABLE_SPORTS.map(availableSport => stringUtils.capitalize(availableSport))
                  )}/>
        </div>
        <div className="three-fifth">{sportComponent}</div>
      </>
    )
  }
}

export default ManageSportsDisplayer;
