import Route from '@ember/routing/route';
import { fetchMunicipality, fetchDecisions } from '../helpers/sparql';

export default class MunicipalityRoute extends Route {
  async model(params) {
    const municipality = await fetchMunicipality(params.cityName);
    console.log(municipality);
    return municipality;
  }
}
