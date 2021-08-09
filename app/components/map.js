import Component from '@glimmer/component';
import ENV from 'ember-leaflet-tracker/config/environment';

const MAPBOX_API =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?';

export default class MapComponent extends Component {
  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  get url() {
    let accesToken = `access_token=${this.token}`;

    return `${MAPBOX_API}${accesToken}`;
  }

  get token() {
    return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
  }
}
