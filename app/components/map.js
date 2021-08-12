import Component from '@glimmer/component';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { start } from '../helpers/sparql';

export default class MapComponent extends Component {
  @tracked municipalities = A([]);
  @tracked coordinates = A([]);

  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  @action
  locations(coordinates) {
    console.log(coordinates);
    return coordinates.map((c) => ({ lat: c[1], lng: c[0] }));
  }

  @action
  async start() {
    const result = await start();
    console.log('result: ', result);
    this.municipalities = result;
    result.map((r, i) => {
      this.coordinates.push(r.coordinates);
    });

    this.municipalities.map((m) => {
      const coords = m.coordinates;
      coords.map((c) => {
        c.map((x) => {
          let tmp = x[0];
          x[0] = x[1];
          x[1] = tmp;
        });
      });
    });
  }
}
