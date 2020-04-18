import React from "react";

class StatNumber extends React.Component {
  state = {};

  render() {
    let { title, number, colorClassName, unit } = this.props;

    if (unit) number += " " + unit
    return (
      <div>
        <article className="card">
          <header className="has-no-breakspace">
            <h3>{title}</h3>
          </header>
          <footer className={colorClassName}>
            <h1 className="number center">
              {number}
            </h1>
          </footer>
        </article>
      </div>
    );
  }
}

export default StatNumber;
