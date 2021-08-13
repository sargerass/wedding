import React from "react";
import LeaveMeesageComponent from "../../components/leave-message/leave-message";
import MapComponent from "../../components/map/map";
import ModalComponent from "../../components/modal/modal";
import { EnumModalTransition } from "../../core/enums";
import { IGuest, IMessage } from "../../core/intrefaces";
import { MessageService } from "../../core/services";
import { LogService } from "../../core/services/logs.service";
import "./invitation.scss";
interface IProps {
  //onFinish?: Function;
  guest: IGuest;
}
interface IState {
  showModal: boolean;
  component: JSX.Element;
  type: EnumModalTransition;
  messages: IMessage[];
}
class InvitationPage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      component: <div></div>,
      type: EnumModalTransition.Unfolding,
      messages: [],
    };
    this._setup();
  }
  private _setup(): void {
    this._closeModal = this._closeModal.bind(this);
  }

  private _closeModal(): void {
    this.setState({ showModal: false });
  }
  private _showModal(type: EnumModalTransition): void {
    const { guest } = this.props;
    const { messages } = this.state;
    let component, section;
    if (type == EnumModalTransition.Revealing) {
      section = 'map';
      component = <MapComponent />;
    } else {
      section = 'mensajes';
      component = <LeaveMeesageComponent guest={guest} />;
    }
    LogService.getInstance().register("Open modal", section);
    this.setState({ showModal: true, component, type });
  }
  render() {
    const { guest } = this.props;
    const { firstname, linkImage } = guest;
    const { type, component, showModal } = this.state;
    return (
      <div className="page-invitation">
        <div className="page-invitation__content">
          <div className="page-invitation__content__area">
            <img className="page-invitation__image" src={linkImage} alt="" />
            <div className="page-invitation__message">
              {firstname}, estas invitado <br />a nuestra boda
            </div>
            <h2 className="page-home__sub-title">
              Cristina <br /> & <br /> Guillermo
            </h2>
            <div className="page-invitation__date">
              <div className="page-invitation__date__index">AGO</div>
              <div className="page-invitation__date__box">
                <div className="page-invitation__date__side">Sábado</div>
                <div className="page-invitation__date__day">28</div>
                <div className="page-invitation__date__side">12:00 M</div>
              </div>
              <div className="page-invitation__date__index">2021</div>
            </div>

            <div className="page-invitation__buttons">
              <button
                className="app-button app-button--block app-button--secondary"
                onClick={() => this._showModal(EnumModalTransition.Revealing)}
              >
                Ver mapa
              </button>
              <button
                className="app-button app-button--block"
                onClick={() => this._showModal(EnumModalTransition.Unfolding)}
              >
                {" "}
                Dejar mensaje
              </button>
            </div>
          </div>
        </div>
        <ModalComponent
          show={showModal}
          type={type}
          outModal={this._closeModal}
        >
          {component}
        </ModalComponent>
      </div>
    );
  }
}
export default InvitationPage;
