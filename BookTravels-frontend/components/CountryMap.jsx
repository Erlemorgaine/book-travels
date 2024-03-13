import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
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

  function getPathBoundingBox(svgPathString) {
    // Create a temporary SVG namespace
    const svgNS = "http://www.w3.org/2000/svg";

    // Create a temporary SVG element to work with
    const tempSvg = document.createElementNS(svgNS, "svg");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", svgPathString);
    tempSvg.appendChild(path);

    const bbox = path.getBBox();

    return {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    };
  }

  function calculateCombinedBoundingBox(boundingBoxes) {
    // Initialize variables to track the minimum and maximum coordinates
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Iterate over each bounding box to update the min and max values
    boundingBoxes.forEach((bbox) => {
      minX = Math.min(minX, bbox.x);
      minY = Math.min(minY, bbox.y);
      maxX = Math.max(maxX, bbox.x + bbox.width);
      maxY = Math.max(maxY, bbox.y + bbox.height);
    });

    // Calculate the overall width and height
    const width = maxX - minX;
    const height = maxY - minY;

    // Return the combined bounding box
    return {
      x: minX,
      y: minY,
      width: width,
      height: height,
    };
  }

  function createMap() {
    let countriesJsonCopy = {
      ...countriesJson,
      objects: { ...countriesJson.objects },
    };

    let countriesFromJson = { ...countriesJsonCopy.objects.countries };
    const selectedCountries =
      countriesJsonCopy.objects.countries.geometries.filter(
        (item) => item.properties.iso_a2 === countryCode
      );

    countriesFromJson.geometries = selectedCountries;
    countriesJsonCopy.objects.countries = countriesFromJson;

    const countries = feature(countriesJsonCopy, countriesFromJson);
    setGeojson(countries);
  }

  // {...panResponder.panHandlers}
  return (
    <View style={{ flex: 1 }}>
      <Svg
        ref={svgRef}
        width={windowWidth}
        height={windowWidth * mapHeightFactor}
        viewBox={`${windowWidth * -0.5} ${
          windowWidth * -mapHeightFactor * 0.55
        } ${windowWidth} ${windowWidth * mapHeightFactor}`}
      >
        <G id="country-map-wrapper">
          <G id="country-map-countries">
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
