import React from "react";
import logo from "./logo.svg";
import "./app.scss";
import HomePage from "./pages/home/home";
import axios from "axios";
import { AppInterceptor } from "./core/intercertors";
import { IGuest } from "./core/intrefaces";
import InvitationPage from "./pages/invitation/invitation";
import bg from "./assets/images/papel.jpg";
import topL from "./assets/images/top-l.png";
import topR from "./assets/images/top-r.png";
import bottomL from "./assets/images/bottom-l.png";
import bottomR from "./assets/images/bottom-r.png";
interface IProps {}
interface IState {
  guest?: IGuest;
}
class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this._setup();
    this._setupAxios();
  }
  private _setup(): void {
    const guest: IGuest = {
      "id": 1,
      "firstname": "Guillermo",
      "lastname": "Asto",
      "document": "45219439",
      "idImage": 1,
      linkImage: 'http://127.0.0.1:8000/storage/45219439.jpeg',
      "image": {
        "id": 1,
        "path": "45219439.jpeg",
        "name": ''
      }
    };
    this.state = {
      guest: undefined,
    };
    this._enterGuest = this._enterGuest.bind(this);
  }
  private _setupAxios(): void {
    axios.defaults.baseURL = process.env.REACT_APP_API;
    AppInterceptor.getInstance().init();
  }
  private _enterGuest(guest: any): void {
    this.setState({
      guest,
    });
  }
  render() {
    const page = this._getPage();

    return (
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="app__top app__top--r">
          <img src={topR} alt="" />
        </div>
        <div className="app__top app__top--l">
          <img src={topL} alt="" />
        </div>
        <div className="app__bottom app__bottom--r">
          <img src={bottomR} alt="" />
        </div>
        <div className="app__bottom app__bottom--l">
          <img src={bottomL} alt="" />
        </div>
        {page}
      </div>
    );
  }
  private _getPage(): JSX.Element {
    const { guest } = this.state;
    return guest ? (
      <InvitationPage guest={guest} />
    ) : (
      <HomePage onFinish={this._enterGuest} />
    );
  }
}

export default App;
