import Route from '@ember/routing/route';
import { start } from '../helpers/sparql';

export default class ApplicationRoute extends Route {
  async model() {
    const result = await start();

    result.map((m) => {
      const coords = m.coordinates;
      coords.map((c) => {
        c.map((x) => {
          let tmp = x[0];
          x[0] = x[1];
          x[1] = tmp;
        });
      });
    });

    return result;
  }
}
