import React from "react";
import { IGuest, IMessage } from "../../core/intrefaces";
import { MessageService } from "../../core/services";
//import Lottie from "react-lottie";
import "./leave-message.scss";
import bg from "../../assets/images/messages.jpg";
import adjuntar from "../../assets/images/icons/adjuntar.png";
import send from "../../assets/images/icons/send.png";
import LoaderComponent from "../loader/loader";
import back from "../../assets/images/icons/back.png";
interface IProps {
  guest: IGuest;
}
interface IState {
  messages: IMessage[] | undefined;
  rows: number;
  loader: boolean;
  imageAdjunta?: string;
  btnFile: any;
}
class LeaveMeesageComponent extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      messages: undefined,
      rows: 1,
      loader: true,
      btnFile: React.createRef()
    };
    this._setup();
  }
  private _setup(): void {
    this._back = this._back.bind(this);
    this._chargeImage = this._chargeImage.bind(this);
    this._registerMessage = this._registerMessage.bind(this);
    this._chargeMessages = this._chargeMessages.bind(this);
    this._uploadPhoto = this._uploadPhoto.bind(this);
  }
  componentDidMount() {
    this._chargeMessages();
  }
  private _chargeMessages(): void {
    const { id } = this.props.guest;
    this.setState({ imageAdjunta: undefined });
    MessageService.getInstance()
      .getAll(id)
      .then(
        (res) => {
          this.setState({ messages: res, loader: false });
        },
        (error) => {
          console.log("error", error);
        }
      );
  }
  private _registerMessage(e: any): void {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    const image = form.image.files[0];
    const data = new FormData();
    const { document } = this.props.guest;
    data.append("document", document);
    data.append("message", message);
    data.append("image", image);
    MessageService.getInstance()
      .register(data)
      .then((res) => {
        console.log("register messages", res);
        this.state.btnFile.current.value = '';
        this._chargeMessages();
      });
    form.message.value = "";
    
  }
  public _getMessages(): JSX.Element | JSX.Element[] {
    const { messages, loader } = this.state;
    if (loader) {
      return this._getLoaader();
    } else if (messages) {
      return messages.map((messageData) => {
        const { message, linkImage, id } = messageData;
        return (
          <div className="app-message" key={id}>
            <div className="">
              <img src={linkImage} className="app-message__image" alt="" />
            </div>
            <div className="app-message__text">{message}</div>
          </div>
        );
      }) as JSX.Element[];
    }
    return <div></div>;
  }
  private _getLoaader(): JSX.Element {
    return (
      <div className="app-leave-message__loader">
        <LoaderComponent />
      </div>
    );
  }
  private _animateMessages(): void {
    const elementMessages = document.getElementById("mssages");
    elementMessages?.scrollTo({ top: 100000, behavior: "smooth" });
  }
  private _uploadPhoto(): void {
    console.log("this.btnFile.current;", this.state.btnFile.current);
    this.state.btnFile.current.click();
  }
  private _chargeImage(): void {
    const input = this.state.btnFile.current;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        const image64 = e.target.result;
        this.setState({ imageAdjunta: image64 });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  private _back(): void {
    this.setState({ imageAdjunta: undefined });
  }
  private _getPreview() {
    const { imageAdjunta } = this.state;
    return imageAdjunta ? (
      <div
        className="app-leave-message__adjunta"
        style={{ backgroundImage: `url(${imageAdjunta})` }}
      >
        <button className="app-modal__content__btn-close" onClick={this._back}>
          <img src={back} alt="" />
        </button>
      </div>
    ) : (
      ""
    );
  }
  render() {
    console.log("prps", this.props);
    const { imageAdjunta } = this.state;
    const messages = this._getMessages();
    setTimeout(() => {
      this._animateMessages();
    }, 100);
    const contentPreview = this._getPreview();
    return (
      <div
        className="app-leave-message"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div id="mssages" className="app-leave-message__messages">
          {messages}
        </div>
        {contentPreview}
        <form
          onSubmit={this._registerMessage}
          className="app-leave-message__form"
        >
          <div className="app-leave-message__input">
            <textarea
              name="message"
              rows={2}
              placeholder="Escribe aquí tu mensaje"
            ></textarea>
            <button
              type="button"
              className="app-button-icon"
              onClick={this._uploadPhoto}
            >
              <img src={adjuntar} alt="" />
            </button>
          </div>
          <input
            type="file"
            name="image"
            className="app-leave-message__file"
            accept="image/png, image/gif, image/jpeg"
            onChange={this._chargeImage}
            ref={this.state.btnFile}
          />
          <button
            type="submit"
            className="app-button-icon app-button-icon--black"
          >
            <img src={send} alt="" />
          </button>
        </form>
      </div>
    );
  }
}
export default LeaveMeesageComponent;
