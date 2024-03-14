const fs = require("fs");
const topojson = require("topojson-client");
const topojsonServer = require("topojson-server");
const topojsonSimplify = require("topojson-simplify");

const worldData = JSON.parse(
  fs.readFileSync("./BookTravels-frontend/assets/maps/countries.json", "utf8")
);

const countries = topojson.feature(
  worldData,
  worldData.objects.countries
).features;

countries.forEach((country) => {
  // Extract the country's geometry
  const geojson = {
    type: "FeatureCollection",
    features: [country],
  };
  console.log(country);

  // Convert GeoJSON back to TopoJSON
  const topojsonCountry = topojsonServer.topology({ country: geojson });

  // Simplify the topology to remove unnecessary arcs
  const simplified = topojsonSimplify.presimplify(topojsonCountry);
  topojsonSimplify.simplify(simplified, 1e-6); // Adjust the tolerance as needed

  // Write to a new TopoJSON file
  const fileName = `./output/${country.properties.iso_a2}.json`; // Name the file after the country
  fs.writeFileSync(fileName, JSON.stringify(simplified));

  console.log(`Generated TopoJSON for ${country.properties.name}`);
});
