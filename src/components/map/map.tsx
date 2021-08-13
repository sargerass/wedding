import GoogleMapReact from 'google-map-react';
import React from "react";
//import Lottie from "react-lottie";
import "./map.scss";
import point from "../../assets/images/icons/point.png";
interface IProps {

}
interface IState {}
class MapComponent extends React.Component<IProps, IState> {
  
  static defaultProps = {
    center: {
      lat: -11.9674452,
      lng: -76.74892
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
  }

  private _registerMessage(e: any): void {
  }
  render() {
    console.log('prps', this.props, process.env.REACT_APP_GM );
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
          <a className="app-button app-button--block" href={linkWaze} target="_blank" >
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
    Las Vegas Manzana C Lote 12_A <br />
      Chosica altura puente los Ángeles
    </div>
  </div>
}
export default MapComponent;
