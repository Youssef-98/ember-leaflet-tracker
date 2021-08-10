import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { newEngine } from '@comunica/actor-init-sparql';

const myEngine = newEngine();

export default class MapComponent extends Component {
  @tracked sparql = [];

  lat = 51.0109;
  lng = 3.7265;
  zoom = 9;

  get url() {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  get hello() {
    return 'hello world!';
  }

  @action
  async sparqlQuery() {
    const result = await myEngine.query(
      `
      SELECT ?s ?p ?o WHERE {
        ?s ?p <http://dbpedia.org/resource/Belgium>.
        ?s ?p ?o
      } LIMIT 100`,
      {
        sources: ['http://fragments.dbpedia.org/2015/en'],
      }
    );

    // Consume results as a stream (best performance)
    result.bindingsStream.on('data', (binding) => {
      this.sparql.push(binding);

      console.log(binding.get('?s').value);
      console.log(binding.get('?s').termType);

      console.log(binding.get('?p').value);

      console.log(binding.get('?o').value);
    });

    result.bindingsStream.on('error', (error) => {
      console.error(error);
    });
  }
}
