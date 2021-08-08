import React from "react";
import { IGuest } from "../../core/intrefaces";

interface IProps {
  //onFinish?: Function;
  guest: IGuest;
}
interface IState {}
class InvitationPage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this._setup();
  }
  private _setup(): void {}
  render() {
    const { firstname } = this.props.guest;
    return (
      <div>
        Hola {firstname}
        <div>
          <button> Ver mapa</button>
          <button> Dejar mensaje</button>
          <button> Uniser al whastapp</button>
        </div>
      </div>
    );
  }
}
export default InvitationPage;
