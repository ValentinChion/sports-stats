import React from 'react';
import StatNumber from './StatNumber';

class NumbersInJSONDisplayer extends React.Component {
  state = {
    
  }

  render() {
    const {
      numbers,
      title,
      colorClassName,
      isDoubleNumber,
      unit
    } = this.props

    return (
      <>
        {title && <h3>{title}</h3>}
        <div className="flex two three-600 four-800 five-1200 center">
          {!isDoubleNumber && numbers && Object.entries(numbers).map(number => 
            <StatNumber title={number[0]}
                        key={number[0]}
                        colorClassName={colorClassName}
                        unit={unit}
                        number={number[1]} />
          )}
        </div>
      </>
    )
  }
}

export default NumbersInJSONDisplayer;
