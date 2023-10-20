import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { feature } from "topojson";

import countriesJson from "../assets/countries.json";

const CountryMap = ({ countryCode, color }) => {
  const windowWidth = Dimensions.get("window").width;
  const svgRef = useRef(null);

  const [zoomScale, setZoomScale] = useState(0.75);
  const [geojson, setGeojson] = useState(null);

  // Define a projection for your map
  const projection = geoNaturalEarth1().scale(150).translate([0, 0]);
  const mapHeightFactor = 0.85;

  useEffect(() => {
    createMap();
  }, []);

  function createMap() {
    const selectedCountries = countriesJson.objects.countries.geometries.filter(
      (item) => item.properties.iso_a2 === countryCode
    );
    countriesJson.objects.countries.geometries = selectedCountries;

    const countries = feature(countriesJson, countriesJson.objects.countries);

    setGeojson(countries);
  }

  // {...panResponder.panHandlers}
  return (
    <View style={{ flex: 1 }}>
      <Svg
        ref={svgRef}
        viewBox={`${windowWidth * -0.5} ${
          windowWidth * -mapHeightFactor * 0.55
        } ${windowWidth} ${windowWidth * mapHeightFactor}`}
      >
        <G id="map-wrapper">
          <G id="map-countries">
            {geojson &&
              geojson.features.map((countryData, i) => (
                <Path
                  key={countryData.properties.iso_a2 + i} // Use a unique identifier
                  d={geoPath().projection(projection)(countryData)} // Use the projection
                  fill={color}
                  stroke="gray"
                  strokeWidth={0.5}
                  transform={`scale(${zoomScale})`} // Apply the zoom scale
                />
              ))}
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default CountryMap;
