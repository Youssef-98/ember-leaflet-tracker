export const queryMunicipalities = `
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

SELECT ?werkingsgebied (COUNT(?besluit) as ?count) WHERE {
  ?zitting a besluit:Zitting .
  ?zitting besluit:behandelt ?agendapunt .
  ?behandelingVanAgendapunt dcterms:subject ?agendapunt .

  ?besluit prov:wasGeneratedBy ?behandelingVanAgendapunt .

  ?zitting besluit:isGehoudenDoor ?bo .
  ?bo besluit:bestuurt ?s .
  ?s a besluit:Bestuurseenheid .
  ?s besluit:werkingsgebied [
      rdfs:label ?werkingsgebied
  ]
}

GROUP BY ?werkingsgebied
`;

/* export const queryNis = `
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
}
`; */

/* export const queryDecisions = `
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
}
`;
 */
