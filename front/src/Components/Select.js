import React from 'react';

class Select extends React.Component {
  state = {
    
  }

  render() {
    const {
      handleOptionChoosed,
      choosedValue,
      optionValues,
      textDisplayOptions
    } = this.props;

    return (
      <>
        <select onChange={handleOptionChoosed} value={choosedValue}>
            {optionValues.map((optionValue, idx) => <option value={optionValue} key={optionValue} disabled={idx ? false : true}>
                                                      {textDisplayOptions[idx]}
                                                    </option>)}
        </select>
      </>
    )
  }
}

export default Select;
