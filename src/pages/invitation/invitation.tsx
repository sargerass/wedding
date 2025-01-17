import React from "react";
import LeaveMeesageComponent from "../../components/leave-message/leave-message";
import MapComponent from "../../components/map/map";
import ModalComponent from "../../components/modal/modal";
import { EnumModalTransition } from "../../core/enums";
import { IGuest, IMessage } from "../../core/intrefaces";
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
    this._goFalabella = this._goFalabella.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  private _closeModal(): void {
    this.setState({ showModal: false });
  }
  private _showModal(type: EnumModalTransition): void {
    const { guest } = this.props;
    let component, section;
    if (type === EnumModalTransition.Revealing) {
      section = "map";
      component = <MapComponent />;
    } else {
      section = "mensajes";
      component = <LeaveMeesageComponent guest={guest} />;
    }
    LogService.getInstance().register("Open modal", section);
    this.setState({ showModal: true, component, type });
  }
  private _goFalabella(): void {
    LogService.getInstance().register("Go falabella");
  }
  render() {
    const { guest } = this.props;
    const { firstname, linkImage } = guest;
    const { type, component, showModal } = this.state;
    return (
      <div className="page page-invitation">
        <div className="page-invitation__content">
          <div className="page-invitation__content__area">
            <img className="page-invitation__image" src={linkImage} alt="" />
            <div className="page-invitation__message">
              Hola {firstname}, <br />
              Te invitamos a celebrar nuestra boda, <br /> 
              para nosotros es muy importante  <br />
              contar con tu presencia.
            </div>
            <h2 className="page-home__sub-title">
              Cristina <br /> & <br /> Guillermo
            </h2>
            <div className="page-invitation__date">
              <div className="page-invitation__date__index">AGO</div>
              <div className="page-invitation__date__box">
                <div className="page-invitation__date__side">Sábado</div>
                <div className="page-invitation__date__day">28</div>
                <div className="page-invitation__date__side">01:30 PM</div>
              </div>
              <div className="page-invitation__date__index">2021</div>
            </div>
            <a onClick={this._goFalabella} className="page-invitation__falabella" target="_blank" href="https://www.noviosfalabella.com.pe/novios-pe/public/resultadoBusquedaNovios.do?categoria=todas&idsJerarquias=&nombreCategoria=&nivelCategoria=&codigoEvento=&dvEvento=&radTipoBusqueda=1&txtBusqueda=656316-03">
              Ver lista de novios: <strong>656316-03</strong>
            </a>
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
