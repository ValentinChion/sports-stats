import React from "react";

class StatNumber extends React.Component {
  state = {};

  render() {
    let { title, number, colorClassName, unit } = this.props;

    if (!("" + number).includes(":")) {
      number = Number.parseFloat(number);
      if (number % 1 === 0) number = number.toFixed(0);
      else number = number.toFixed(2); 
    }

    if (unit) number += " " + unit
    return (
      <div>
        <article className="card">
          <header className="has-no-breakspace">
            {title.length >= 19 ? <h5>{title}</h5> : title.length >= 16 ? <h4>{title}</h4> : <h3>{title}</h3>}
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
