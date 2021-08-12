import React from "react";
import HeartsComponent from "../../components/hearts/hearts";
import { GuestService } from "../../core/services";
//import Lottie from "react-lottie";
import "./home.scss";
//import bg from "../../assets/images/bg.png";
import ModalComponent from "../../components/modal/modal";
import { EnumModalTransition } from "../../core/enums";
interface IProps {
  onFinish: Function;
}
interface IState {
  hasError: boolean;
  messageError: string;
}
class HomePage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      messageError: "",
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
    GuestService.getInstance()
      .validateDocument(document)
      .then(
        (res) => {
          console.log("res", res);
          this.props.onFinish(res);
        },
        (error) => {
          console.log('error', error);
          
          this.setState({
            hasError: true,
            messageError: error.message,
          });
          //alert(error.message);
        }
      );
  }
  render() {
    const { hasError } = this.state;
    const error = hasError? 'Número incorrecto, asegúrate de haber escrito bien tu documento': '';
    return (
      <div className="page-home" >
        <HeartsComponent />
        <div className="page-home__content">
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
            <div className="page-home__error">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
