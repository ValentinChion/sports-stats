import React from 'react';

class StatNumber extends React.Component {
  state = {
    
  }

  render() {
    let {
      title,
      number
    } = this.props;

    return (
      <div>
        <article className="card">
          <header><h3>{title}</h3></header>
          <footer className="emphasize"><h1 className="number center">{number}</h1></footer>
        </article>
      </div>
    )
  }
}

export default StatNumber;
