import React from "react";
import HeartsComponent from "../../components/hearts/hearts";
//import Lottie from "react-lottie";
import "./home.scss";
interface IProps {
  onFinish?: Function;
}
interface IState {
  showHeart: boolean;
  showHelp: boolean;
}
class HomePage extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="page-home">
        <HeartsComponent/>
        <div className="page-home__content">
          <div className="page-home__title">
            Cristina y Guillermo
          </div>
        </div>
      </div>
    )
  }
}
export default HomePage;