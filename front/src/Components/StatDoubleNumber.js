import React from "react";

class StatDoubleNumber extends React.Component {
  state = {};

  render() {
    let { title, numbers, colorClassName, units } = this.props;

    const subtitles = Object.keys(numbers);
    numbers = Object.values(numbers);
    if (units && units.length > 0)
      units.map((unit, idx) => {
        if (unit) numbers[idx] = numbers[idx] + " " + unit;
        return true;
      });

    return (
      <div>
        <article className="card">
          <header className="has-no-breakspace">
            <h3>{title}</h3>
          </header>
          <footer className={colorClassName + " has-no-breakspace"}>
            <div>
              <p className="sm-description">{subtitles[0]}</p>
              <div className="number center">
                <h2>{numbers[0]}</h2>
              </div>
            </div>
            <div>
            <p className="sm-description">{subtitles[1]}</p>
              <div className="number center">
                <h2>{numbers[1]}</h2>
              </div>
            </div>
          </footer>
        </article>
      </div>
    );
  }
}

export default StatDoubleNumber;
