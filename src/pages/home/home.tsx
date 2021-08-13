import React from "react";
import HeartsComponent from "../../components/hearts/hearts";
import { GuestService } from "../../core/services";
//import Lottie from "react-lottie";
import "./home.scss";
//import bg from "../../assets/images/bg.png";
import ModalComponent from "../../components/modal/modal";
import { EnumModalTransition } from "../../core/enums";
import { LogService } from "../../core/services/logs.service";
import LoaderComponent from "../../components/loader/loader";
import { sleeper } from "../../core/helpers";
import { IGuest } from "../../core/intrefaces";
interface IProps {
  onFinish: Function;
}
interface IState {
  hasError: boolean;
  messageError: string;
  loading: boolean;
}
class HomePage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      messageError: "",
      loading: false,
    };
    this._setup();
  }
  private _setup(): void {
    this._validateDocument = this._validateDocument.bind(this);
  }
  private _validateDocument(e: any): void {
    e.preventDefault();
    console.log("e", e);
    const form = e.target;
    const document = form.document.value;
    LogService.getInstance().register("Buscando");
    this.setState({ loading: true });
    GuestService.getInstance()
      .validateDocument(document)
      .then(
        (guest) => {
          sessionStorage.setItem("user", "" + guest.id);
          this._chargeImage(guest);

          LogService.getInstance().register("Encontrado", document);
        },
        (error) => {
          LogService.getInstance().register(
            "No se encontro el document",
            document
          );
          this.setState({ loading: false });
          this.setState({
            hasError: true,
            messageError: error.message,
          });
          //alert(error.message);
        }
      );
  }
  private _chargeImage(guest: IGuest): void {
    const { document, linkImage } = guest;
    const image = new Image();
    image.src = linkImage;
    image.onload = () => {
      this.props.onFinish(guest);
      LogService.getInstance().register("Cargo Imagen", document);
    };
    image.onerror = () => {
      this.props.onFinish(guest);
      LogService.getInstance().register("No cargo Imagen", document);
    };
  }
  private _getBodyHome(): JSX.Element {
    const { hasError, loading } = this.state;
    const error = hasError
      ? "Número incorrecto, asegúrate de haber escrito bien tu documento"
      : "";
    return (
      <div>
        <h1 className="page-home__title">Nuestra boda</h1>
        <h2 className="page-home__sub-title">
          Cristina <br /> & <br /> Guillermo
        </h2>
        <form onSubmit={this._validateDocument} className="page-home__box">
          <div className="page-home__box__title">Ver mi invitación</div>
          <input
            name="document"
            type="tel"
            className="app-input"
            placeholder="Ingresa tu documento"
            required
          />
          <br />
          <button className="app-button app-button--block" type="submit">
            Ingresar
          </button>
        </form>
        <div className="page-home__error">{error}</div>
      </div>
    );
  }
  render() {
    const { hasError, loading } = this.state;
    const content = loading ? <LoaderComponent /> : this._getBodyHome();
    return (
      <div className="page-home">
        <HeartsComponent />
        <div className="page-home__content">{content}</div>
      </div>
    );
  }
}
export default HomePage;
