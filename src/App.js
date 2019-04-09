import React, { Component } from 'react';
import './App.css';
import DisplayQuote from './DisplayQuote';
import ToDoList from './ToDoList';
import DisplayWeather from './DisplayWeather';
import DisplayTimeGreetings from './DisplayTimeGreetings';

class App extends Component {

  render() {
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <DisplayWeather />
        <DisplayTimeGreetings />
        <ToDoList />
        <DisplayQuote />
      </div >
    );
  }
}

export default App;
