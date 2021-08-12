import Component from '@glimmer/component';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { start } from '../helpers/sparql';

export default class MapComponent extends Component {
  @tracked municipalities = A([]);

  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  stadspark = [51.213522, 4.415624];

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  get locations() {
    return this.municipalities.map((m) => m.coordinates);
  }

  @action
  async start() {
    const result = await start();
    this.municipalities = result;
    /* this.municipalities.map((m, i) => {
      console.log(`${i}: ${m.coordinates}`);
    }); */
    console.log(this.municipalities);
  }
}
