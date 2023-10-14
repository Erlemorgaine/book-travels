import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson";

import countriesJson from "../assets/countries.json";

const CountryMap = ({ countryCode, color }) => {
  const svgRef = useRef(null);
  const mapGroup = useRef(null);
  const mapCountries = useRef(null);
  const mapZoom = useRef(null);

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

    mapGroup.current = select("#map-wrapper");
    mapCountries.current = select("#map-countries");
  }

  // {...panResponder.panHandlers}
  return (
    <View style={{ flex: 1 }}>
      <Svg
        ref={svgRef}
        viewBox={`${window.innerWidth * -0.5} ${
          window.innerWidth * -mapHeightFactor * 0.55
        } ${window.innerWidth} ${window.innerWidth * mapHeightFactor}`}
      >
        <g id="map-wrapper">
          <g id="map-countries">
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
          </g>
        </g>
      </Svg>
    </View>
  );
};

export default CountryMap;
