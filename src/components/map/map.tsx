import GoogleMapReact from 'google-map-react';
import React from "react";
//import Lottie from "react-lottie";
import "./map.scss";
import point from "../../assets/images/icons/point.png";
import { LogService } from '../../core/services/logs.service';
interface IProps {

}
interface IState {}
class MapComponent extends React.Component<IProps, IState> {
  
  static defaultProps = {
    center: {
      lat: -12.0165912,
      lng: -76.8853589
    },
    zoom: 15
  };
  constructor(props: any) {
    super(props);
    this.state = {
    };
    this._setup();
  }
  private _setup(): void {
    this._registerMessage = this._registerMessage.bind(this);
    this._goWaze = this._goWaze.bind(this);
  }
  private _goWaze():void {
    LogService.getInstance().register("Click Waze");
  }
  private _registerMessage(e: any): void {
  }
  render() {
    const center = MapComponent.defaultProps.center;
    const zoom = MapComponent.defaultProps.zoom;
    const linkWaze = `https://www.waze.com/ul?ll=${center.lat}%2C${center.lng}&navigate=yes&zoom=17`;
    return (
      <div className="app-map">
        <div style={{ height: 'calc(100vh - 34px)', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GM as string }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
        <div className="app-map__buttons">
          <a className="app-button app-button--block" href={linkWaze} target="_blank" onClick={this._goWaze}>
            Ir con Waze
          </a>
        </div>
      </div>
      </div>
    );
  }
}
const Marker = (props: any) => {
  return <div className="app-map__marker" >
    <img src={point} alt="" /> 
    <div className="app-map__marker__message">
      Villa Leonor <br />
      Avenida 28 de Julio Nº138, Ate
    </div>
  </div>
}
export default MapComponent;
