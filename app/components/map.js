import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { start } from '../helpers/sparql';

export default class MapComponent extends Component {
  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  @action
  async start() {
    await start();
  }
}
