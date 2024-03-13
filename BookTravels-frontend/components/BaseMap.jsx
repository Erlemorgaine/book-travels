// import React, { useEffect, useRef, useState } from "react";
// import { View } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import { geoPath, geoNaturalEarth1 } from "d3-geo";
// import { zoom } from "d3-zoom";
// import { select } from "d3-selection";
// import { feature } from "topojson";

// import countriesJson from "../assets/countries.json";
// import { COLORS } from "../utilities/styles/colors";

// const InteractiveMap = ({ booksPerCountry }) => {
//   const svgRef = useRef(null);
//   const mapGroup = useRef(null);
//   const mapCountries = useRef(null);
//   const mapZoom = useRef(null);
//   const bookObj = useRef({});

//   const [currentZoom, setCurrentZoom] = useState(1);
//   const [currentTranslation, setCurrentTranslation] = useState(1);

//   const [zoomScale, setZoomScale] = useState(0.75);
//   const [geojson, setGeojson] = useState(null);

//   // Define a projection for your map
//   const projection = geoNaturalEarth1().scale(150).translate([0, 0]);
//   const mapHeightFactor = 0.85;

//   useEffect(() => {
//     createMap();

//     bookObj.current = booksPerCountry.reduce((prev, next) => {
//       prev[next.code] = next;
//       return prev;
//     }, {});
//   }, []);

//   function createMap() {
//     const countries = feature(countriesJson, countriesJson.objects.countries);
//     setGeojson(countries);

//     mapGroup.current = select("#map-wrapper");
//     mapCountries.current = select("#map-countries");

//     mapZoom.current = zoom().scaleExtent([0.5, 7]).on("zoom", zoomBy); // Improves zoom performance

//     mapGroup.current.call(mapZoom.current).on("dblclick.zoom", null);
//   }

//   function getCountryColor(code) {
//     const book = bookObj.current[code];

//     if (book) {
//       return book.title
//         ? book.read
//           ? COLORS.primaryGreen
//           : COLORS.primaryRed
//         : COLORS.neutral;
//     }

//     return "transparent";
//   }

//   function resetZoom() {
//     mapGroup.current
//       .transition()
//       .duration(750)
//       .call(
//         mapZoom.current.transform,
//         zoomIdentity,
//         zoomTransform(mapGroup.current.node()).invert([
//           svgDimensions.width / 2,
//           svgDimensions.height / 2,
//         ])
//       );
//   }

//   function zoomMap(value) {
//     if (!value) {
//       resetZoom();
//     } else {
//       mapGroup.current
//         .transition()
//         .duration(750)
//         .call(mapZoom.current.scaleBy, value);
//     }
//   }

//   function zoomBy({ transform }) {
//     mapCountries.current.attr("transform", transform);

//     setCurrentZoom(transform.k);
//     setCurrentTranslation({ x: transform.y, y: transform.y });
//   }

//   // {...panResponder.panHandlers}
//   return (
//     <View style={{ flex: 1 }}>
//       <Svg
//         ref={svgRef}
//         width={window.innerWidth}
//         height={window.innerWidth * mapHeightFactor}
//         viewBox={`${window.innerWidth * -0.5} ${
//           window.innerWidth * -mapHeightFactor * 0.55
//         } ${window.innerWidth} ${window.innerWidth * mapHeightFactor}`}
//       >
//         <g id="map-wrapper">
//           <g id="map-countries">
//             {geojson &&
//               geojson.features.map((countryData, i) => (
//                 <Path
//                   key={countryData.properties.iso_a2 + i} // Use a unique identifier
//                   d={geoPath().projection(projection)(countryData)} // Use the projection
//                   fill={getCountryColor(countryData.properties.iso_a2)}
//                   stroke="gray"
//                   strokeWidth={0.5}
//                   //   onPress={() => handleCountryClick(countryData)}
//                   transform={`scale(${zoomScale})`} // Apply the zoom scale
//                 />
//               ))}
//           </g>
//         </g>
//       </Svg>
//     </View>
//   );
// };

// export default InteractiveMap;
