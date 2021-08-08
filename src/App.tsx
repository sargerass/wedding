import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/home/home";
import axios from "axios";
import { AppInterceptor } from "./core/intercertors";
import { IGuest } from "./core/intrefaces";
import InvitationPage from "./pages/invitation/invitation";
interface IProps {
}
interface IState {
  guest?:IGuest;
}
class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this._setup();
    this._setupAxios();
  }
  private _setup(): void {
    
    this.state = {
      guest: undefined
    };
    this._enterGuest = this._enterGuest.bind(this);
  }
  private _setupAxios():void {
    axios.defaults.baseURL = process.env.REACT_APP__API;   
    AppInterceptor.getInstance().init();
  }
  private _enterGuest(guest: any): void {
    console.log('guest', guest);
    this.setState({
      guest
    });
  }
  render() {
    
    const page = this._getPage();
    
    return (
      <div className="App">
        {page}
      </div>
    );
  }
  private _getPage(): JSX.Element {
    const {guest} = this.state;
    return guest? (
      <InvitationPage guest={guest}/>
    ): (
      <HomePage onFinish={this._enterGuest}/>
    );

  }
}

export default App;
