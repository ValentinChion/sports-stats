import React from 'react';
import moment from 'moment';
import stringUtils from '../../utils/string';

class StatsByDurationDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      sessions
    } = this.props

    let dataByMonth;
    if (sessions) {
      dataByMonth = Object.entries(sessions.reduce((acc, session) => {
        // const monthName = moment(session.day.split('-')[1], 'MM').format('MMMM');
        if (acc[session.day.split('-')[1]]) {
          acc[session.day.split('-')[1]] += session.value
        } else acc[session.day.split('-')[1]] = session.value
        return acc
      }, {})).sort((a, b) => +a[0] - b[0]).map(ele => [
        moment(ele[0], "MM").format('MMMM'),
        ele[1]
      ]);
    }

    return (
      <>
        <h3>SCORE CUMULÉS</h3>
        <div className="in-content">
          {dataByMonth && dataByMonth.map(month => <div>
            <strong>{stringUtils.capitalize(month[0])}</strong> 
            <br />
            <div className="in-content">{month[1]}</div>
          </div>)}
        </div>
      </>
    )
  }
}

export default StatsByDurationDisplayer;
