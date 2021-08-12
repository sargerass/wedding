import React from "react";
//import Lottie from "react-lottie";
import "./loader.scss";
interface IProps {
}
interface IState {
}
class LoaderComponent extends React.Component<IProps, IState> {
  render() {
    
    return (
      <div className="lds-heart"><div></div></div>
    )
  }
}
export default LoaderComponent;