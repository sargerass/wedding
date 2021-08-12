import React from "react";
import { EnumModalTransition } from "../../core/enums";
//import Lottie from "react-lottie";
import "./modal.scss";
import back from "../../assets/images/icons/back.png";
interface IProps {
  //guest: IGuest;
  show: boolean;
  type: EnumModalTransition;
  outModal?: Function;
}
interface IState {
  init: boolean;
}
class ModalComponent extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      init: false,
    };
    this._setup();
  }
  private _setup(): void {
    this._closeModal = this._closeModal.bind(this);
    this._forceCloseModal = this._forceCloseModal.bind(this);
  }
  private _closeModal(e: any): void {
    const classTarget = e.target.className;
    if (classTarget === "modal-background") {
      this._forceCloseModal();
    }
  }
  private _forceCloseModal(): void {
    this.setState({ init: true });
    this.props.outModal && this.props.outModal();
  }
  render() {
    const { show, type } = this.props;
    const { init } = this.state;
    const classType = show ? type : init ? `out ${type}` : "";
    const content = show ? this.props.children : "";
    return (
      <div className={`app-modal ${classType}`} onClick={this._closeModal}>
        <div className="modal-background">
          <div className="modal">
            <svg
              className="modal-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <rect
                x="0"
                y="0"
                fill="none"
                width="226"
                height="162"
                rx="3"
                ry="3"
              ></rect>
            </svg>
            <div className="app-modal__content">
              {content}
              <button
                className="app-modal__content__btn-close"
                onClick={this._forceCloseModal}
              >
                <img src={back} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalComponent;
