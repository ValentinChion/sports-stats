import React from 'react';
import './App.css';
import Data from '../Data/Data'; 
import storageHandler from '../utils/localStorage/storage';

class App extends React.Component {
  state = {
  
  }

  componentDidMount() {
    window.storageHandler = storageHandler;
  } 

  render() {
    return (
      <>
        <div className="content">
          <Data/>
          <button>Keukou</button>
        </div>
      </>
    )
  }
}

export default App;
