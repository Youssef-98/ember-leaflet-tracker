import { queryMunicipalities } from '../utils/query';

async function sparqlEndpoint(source, query) {
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

async function drawNIS(NIS_code) {
  const cors_bypass = 'http://proxy.linkeddatafragments.org/';
  const border_api = `${cors_bypass}http://belgium.geo.nazkamapps.com/geometry/nis/${NIS_code}`;
  const drawy_city_border = await (await fetch(border_api)).json();
  const coordinates = drawy_city_border.geometry.coordinates;

  return coordinates;
}

export async function start() {
  const mArray = [];
  const coords = [];

  let municipalities = await fetchMunicipalities();
  await municipalities.map(async (m, i) => {
    mArray.push(m.cityName);

    const nis = await fetchNis(m.cityName);
    const drawNis = await drawNIS(nis);

    coords.push(drawNis);
  });

  return mArray;
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

/* async function fetchDecisions(municipality) {
  const queryDecisions = {
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
    PREFIX ontology: <http://data.europa.eu/eli/ontology#>
    
    SELECT ?nbPro ?nbAnti ?nbNoVote ?besluit ?title WHERE {
      ?zitting a besluit:Zitting .
      ?zitting besluit:behandelt ?agendapunt .
      ?behandelingVanAgendapunt dcterms:subject ?agendapunt ;
                                besluit:heeftStemming ?stemming.
      ?stemming besluit:aantalVoorstanders ?nbPro;
                besluit:aantalTegenstanders ?nbAnti;
                besluit:aantalOnthouders ?nbNoVote.
     
      ?besluit prov:wasGeneratedBy ?behandelingVanAgendapunt ;
               ontology:title ?title .
      
      ?zitting besluit:isGehoudenDoor ?bo .
      ?bo besluit:bestuurt ?s .
      ?s a besluit:Bestuurseenheid .
      ?s besluit:werkingsgebied [
          rdfs:label '${municipality}'
      ]
    }`,
    source: 'https://centrale-vindplaats.lblod.info/sparql',
  };

  const decisions = await sparqlEndpoint(
    queryDecisions.source,
    queryDecisions.query
  );

  let tmp = {};
  let dArr = [];

  decisions.map((d) => {
    tmp = {
      url: d.besluit.value,
      title: d.title.value,
      nbPro: d.nbPro.value,
      nbAnti: d.nbAnti.value,
      nbNoVote: d.nbNoVote.value,
    };
    dArr.push(tmp);
  });

  console.log(dArr);
} */
