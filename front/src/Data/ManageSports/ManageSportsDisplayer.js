import React from 'react';
import constants from '../../utils/constants/global';
import stringUtils from '../../utils/string';

class ManageSportsDisplayer extends React.Component {
  state = {
    availableSports: constants.AVAILABLE_SPORTS
  }

  render() {
    return (
      <>
        <div>
          <select>
            {this.state.availableSports.map((sport) => <option key={sport}>
                                                          {stringUtils.capitalize(sport)}
                                                        </option>)}
          </select>
        </div>
        <div className="three-fifth"></div>
      </>
    )
  }
}

export default ManageSportsDisplayer;
