import Component from '@glimmer/component';

/* const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine(); */

const MAPBOX_API =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?';

export default class MapComponent extends Component {
  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }
}
