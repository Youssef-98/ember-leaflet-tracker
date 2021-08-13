import Route from '@ember/routing/route';
import { fetchMunicipality } from '../helpers/sparql';

export default class MunicipalityRoute extends Route {
  async model(params) {
    const municipality = await fetchMunicipality(params.cityName);
    return municipality;
  }
}
