import React from 'react';
import './App.css';
import storageHandler from '../utils/localStorage/storage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Sports from '../Sports/Sports';


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
          <Sports/>
        </div>
      </>
    )
  }
}

export default App;
