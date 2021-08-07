import React from "react";
import HeartsComponent from "../../components/hearts/hearts";
//import Lottie from "react-lottie";
import "./home.scss";
interface IProps {
  onFinish?: Function;
}
interface IState {

}
class HomePage extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
    this._setup();
  }
  private _setup(): void {
    this._validateDocument = this._validateDocument.bind(this);
  }
  private _validateDocument(e:any): void {
    e.preventDefault();
    console.log('e', e);
    const form = e.target;
    const document = form.document.value;    
  }
  render() {
    return (
      <div className="page-home">
        <HeartsComponent/>
        <div className="page-home__content">
          <div>
            <div className="page-home__title">
              Bievenido a nuestra boda
            </div>
            <div>
              Cristina <br /> y  <br /> Guillermo
            </div>
            <form onSubmit={this._validateDocument}>
              <input name="document" type="tel" placeholder="Documento" required/>
              <br />
              <button>Ingresar</button>
            </form>
          </div>
          
        </div>
      </div>
    )
  }
}
export default HomePage;