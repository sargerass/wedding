import React from "react";
import { IGuest } from "../../core/intrefaces";
//import Lottie from "react-lottie";
import "./hearts.scss";
interface IProps {
  guest: IGuest;
}
interface IState {}
class LeaveMeesageComponent extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="app-modal app-leave-message">
        <form action="">
          <h3>Ingresa mensaje</h3>
          <textarea name="message"></textarea>
          <input type="file" accept="image/png, image/gif, image/jpeg" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}
export default LeaveMeesageComponent;
