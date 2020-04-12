import React from 'react';
import './App.css';
import Data from '../Data/Data'; 
import storageHandler from '../utils/localStorage/storage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt)

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
        </div>
      </>
    )
  }
}

export default App;
