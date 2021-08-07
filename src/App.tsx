import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/home/home";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this._setup();
  }
  private _setup(): void {
    
  }
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
