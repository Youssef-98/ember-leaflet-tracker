import { queryMunicipalities } from '../utils/query';

export async function sparqlEndpoint(source, query) {
  const endpoint = `${source}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/sparql-results+json' },
  });
  const queryData = await response.json();

  let {
    results: { bindings },
  } = queryData;

  return bindings;
}

export async function drawNIS(NIS_code, data) {
  const cors_bypass = 'http://proxy.linkeddatafragments.org/';
  const border_api = `${cors_bypass}http://belgium.geo.nazkamapps.com/geometry/nis/${NIS_code}`;
  const drawy_city_border = await (await fetch(border_api)).json();

  console.log(drawy_city_border);
}

export async function start() {
  let municipalities = await fetchMunicipalities();
  for (let m in municipalities) {
    const municipality = municipalities[m];
    console.log(municipality);
    const nis = await fetchNis(municipality.cityName);
  }
}

async function fetchMunicipalities() {
  const municipalities = await sparqlEndpoint(
    queryMunicipalities.source,
    queryMunicipalities.query
  );

  let tmp = {};
  let mArr = [];

  municipalities.map((m) => {
    tmp = {
      cityName: m.werkingsgebied.value,
      count: m.count.value,
    };
    mArr.push(tmp);
  });

  return mArr;
}

async function fetchNis(municipality) {
  const queryNis = {
    query: `
    PREFIX dcterm: <http://purl.org/dc/terms/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX bs: <https://w3id.org/def/basicsemantics-owl#>
    PREFIX ma: <http://www.w3.org/ns/ma-ont#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
    PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
    PREFIX persoon: <http://data.vlaanderen.be/ns/persoon#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX prov: <http://www.w3.org/ns/prov#>
    
    SELECT ?nis
    WHERE {
      ?gemeente <http://www.wikidata.org/prop/direct/P31> <http://www.wikidata.org/entity/Q493522> ;
        <http://www.wikidata.org/prop/direct/P373> '${municipality}' ;
      <http://www.wikidata.org/prop/direct/P1567> ?nis .
    }`,
    source: 'https://query.wikidata.org/sparql',
  };

  const nis = await sparqlEndpoint(queryNis.source, queryNis.query);

  return nis[0].nis.value;
}
