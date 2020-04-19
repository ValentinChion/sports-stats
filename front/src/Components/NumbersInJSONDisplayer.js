import React from "react";
import StatNumber from "./StatNumber";
import StatDoubleNumber from "./StatDoubleNumber";

class NumbersInJSONDisplayer extends React.Component {
  state = {};

  render() {
    const { numbers, title, colorClassName, areDoubleNumbers, unit, units } = this.props;

    return (
      <>
        {title && <h3>{title}</h3>}
        <div className="flex two three-600 four-800 five-1200 center">
          {!areDoubleNumbers &&
            numbers &&
            Object.entries(numbers).map((number) => <StatNumber title={number[0]} key={number[0]} colorClassName={colorClassName} unit={unit} number={number[1]} />)}
          {areDoubleNumbers &&
            numbers &&
            Object.entries(numbers).map((numberCouple) => (
              <StatDoubleNumber title={numberCouple[0]} key={numberCouple[0]} colorClassName={colorClassName} units={units} numbers={numberCouple[1]} />
            ))}
        </div>
      </>
    );
  }
}

export default NumbersInJSONDisplayer;
