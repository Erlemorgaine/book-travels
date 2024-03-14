import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { feature } from "topojson";
import { countrySvgs } from "../utilities/countrySvgs";

// import countriesJson from "../assets/maps/countries.json";

const CountryMap = ({ countryCode, color }) => {
  const svgWidth = Dimensions.get("window").width * 0.3;
  // Define a projection for your map

  const svgRef = useRef(null);

  const [countryPath, setCountryPath] = useState(null);

  useEffect(() => {
    createMap();
  }, []);

  async function createMap() {
    const countryJson = countrySvgs[countryCode];
    const countries = feature(countryJson, countryJson.objects.country);

    const projection = geoNaturalEarth1().fitSize(
      [svgWidth, svgWidth],
      countries
    ); //.scale(150).translate([0, 0]);

    const path = geoPath().projection(projection)(countries.features[0]);

    setCountryPath(path);
  }

  // {...panResponder.panHandlers}
  return (
    <View>
      <Svg
        ref={svgRef}
        width={svgWidth}
        height={svgWidth}
        viewBox={`0 0 ${svgWidth} ${svgWidth}`}
      >
        <G id="country-map-wrapper">
          <G id="country-map-countries">
            {countryPath && (
              <Path
                d={countryPath} // Use the projection
                fill={color}
                stroke="gray"
                strokeWidth={0.5}
              />
            )}
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default CountryMap;
