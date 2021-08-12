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

  restaurants = [
    [2.989816683000072, 50.91617313800003],
    [2.9505748000000267, 50.87572132200006],
    [2.8438445630000615, 50.91933953100005],
  ];

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  get locations() {
    return this.coordinates[0].map((c) => ({ lat: c[1], lng: c[0] }));
  }

  @action
  async start() {
    const result = await start();
    console.log(result);
    this.municipalities = result;
    result.map((r, i) => {
      i === 2 && (this.coordinates = r.coordinates);
    });
    console.log(this.coordinates);
  }
}
