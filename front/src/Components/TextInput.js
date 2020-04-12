import React from 'react';

class TextInput extends React.Component {
  state = {
    
  }

  render() {
    const {
      name,
      placeholder,
      handleChange
    } = this.props

    return (
      <input type="text" name={name} placeholder={placeholder} onChange={handleChange}></input>
    )
  }
}

export default TextInput;
