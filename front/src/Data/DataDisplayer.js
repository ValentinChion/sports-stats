import React from 'react';
import ManageSports from './ManageSports/ManageSports';

class DataDisplayer extends React.Component {
  state = {
    
  }

  render() {
    return (
      <>
      <section className="flex grow">
        <ManageSports/>
      </section>
      </>
    )
  }
}

export default DataDisplayer;
