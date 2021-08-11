import { queryMunicipalities, queryNis, queryDecisions } from '../utils/query';

export async function sparqlEndpoint(source, query) {
  const endpoint = `${source}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/sparql-results+json' },
  });
  const queryData = await response.json();

  // let { results: { bindings } } = queryData;

  return queryData;
}

export async function drawNIS(NIS_code, data) {
  const cors_bypass = 'http://proxy.linkeddatafragments.org/';
  const border_api = `${cors_bypass}http://belgium.geo.nazkamapps.com/geometry/nis/${NIS_code}`;
  const drawy_city_border = await (await fetch(border_api)).json();

  console.log(drawy_city_border);
}

export async function start() {
  let municipalities = await fetchMunicipalities();
  console.log(municipalities);
}

export async function fetchMunicipalities() {
  const municipalities = await sparqlEndpoint(
    queryMunicipalities.source,
    queryMunicipalities.query
  );

  console.log(municipalities);
}
