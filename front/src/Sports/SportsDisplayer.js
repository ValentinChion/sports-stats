import React from 'react';
import Running from './Running/Running';
import WeightTraining from './WeightTraining/WeightTraining';
import BasketBall from './BasketBall/BasketBall';
import ListSession from '../Data/ManageSports/Sessions/ListSessions/ListSession';

class SportsDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
      <h3>TOUTES MES SÉANCES</h3>
      <ListSession />
      <h3>GÉRER LES SÉANCES</h3>
      <section className="flex grow">
        <div className="tabs three">
          <input id='tab-1' type='radio' name='tabgroupB' defaultChecked />
          <label className="pseudo button toggle" htmlFor="tab-1">Course</label>
          <input id='tab-2' type='radio' name='tabgroupB' />
          <label className="pseudo button toggle" htmlFor="tab-2">Musculation</label>
          <input id='tab-3' type='radio' name='tabgroupB' />
          <label className="pseudo button toggle" htmlFor="tab-3">BasketBall</label>
          <div className="row">
            <div className="tab-container">
              <Running />
            </div>
            <div className="tab-container">
              <WeightTraining />
            </div>
            <div className="tab-container">
              <BasketBall />
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default SportsDisplayer;
