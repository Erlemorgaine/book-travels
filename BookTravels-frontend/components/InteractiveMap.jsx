import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Defs, Path, G } from "react-native-svg";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { zoom } from "d3-zoom";
// import { select } from "d3-selection";
import { feature } from "topojson";
import { COLORS } from "../utilities/styles/colors";

import countriesJson from "../assets/countries.json";
// import ButtonRound from "./ButtonRound";
import AddBookModal from "./AddBookModal";
import MapLegend from "./MapLegend";
import BookModal from "./BookModal";
import CountriesReadChart from "./CountriesReadChart";

const InteractiveMap = ({
  booksPerCountry,
  userId,
  amountBooksRead,
  onBookListUpdate,
}) => {
  const windowWidth = Dimensions.get("window").width;

  const svgRef = useRef(null);
  const mapGroup = useRef(null);
  const mapCountries = useRef(null);
  const mapZoom = useRef(null);
  const bookObj = useRef({});

  const [currentZoom, setCurrentZoom] = useState(1);
  const [currentTranslation, setCurrentTranslation] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoomScale, setZoomScale] = useState(0.75);
  const [geojson, setGeojson] = useState(null);

  // Define a projection for your map
  const projection = geoNaturalEarth1().scale(150).translate([0, 0]);
  const mapHeightFactor = 0.85;

  useEffect(() => {
    createMap();

    bookObj.current = booksPerCountry.reduce((prev, next) => {
      prev[next.code] = next;
      return prev;
    }, {});
  }, []);

  function createMap() {
    const countries = feature(countriesJson, countriesJson.objects.countries);
    setGeojson(countries);

    // mapGroup.current = select("#map-wrapper");
    // mapCountries.current = select("#map-countries");

    mapZoom.current = zoom().scaleExtent([0.5, 7]).on("zoom", zoomBy); // Improves zoom performance
    // TODO: Add Panresponder
    // https://stackoverflow.com/questions/46955024/d3-zoom-behavior-in-react-native
    // mapGroup.current.call(mapZoom.current).on("dblclick.zoom", null);
  }

  function getCountryColor(code) {
    const book = bookObj.current[code];

    if (book) {
      return book.title
        ? book.read
          ? COLORS.primaryGreen
          : COLORS.primaryRed
        : COLORS.neutral;
    }

    return "transparent";
  }

  const handleCountryClick = (countryCode) => {
    const bookItem = booksPerCountry.find((item) => item.code === countryCode);

    if (bookItem) {
      setSelectedCountry({ ...bookItem, country: bookItem.name, countryCode });
    }
  };

  function resetZoom() {
    mapGroup.current
      .transition()
      .duration(750)
      .call(
        mapZoom.current.transform,
        zoomIdentity,
        zoomTransform(mapGroup.current.node()).invert([
          svgDimensions.width / 2,
          svgDimensions.height / 2,
        ])
      );
  }

  function zoomMap(value) {
    if (!value) {
      resetZoom();
    } else {
      mapGroup.current
        .transition()
        .duration(750)
        .call(mapZoom.current.scaleBy, value);
    }
  }

  function zoomBy({ transform }) {
    mapCountries.current.attr("transform", transform);

    setCurrentZoom(transform.k);
    setCurrentTranslation({ x: transform.y, y: transform.y });
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
        <G id="map-wrapper" ref={mapGroup}>
          <G id="map-countries" ref={mapCountries}>
            {geojson &&
              geojson.features.map((countryData, i) => (
                <G key={countryData.properties.iso_a2 + i}>
                  <Path
                    d={geoPath().projection(projection)(countryData)}
                    fill={getCountryColor(countryData.properties.iso_a2)}
                    stroke="gray"
                    strokeWidth={0.5}
                    transform={`scale(${zoomScale})`}
                    onClick={() =>
                      handleCountryClick(countryData.properties.iso_a2)
                    }
                    onPress={() =>
                      handleCountryClick(countryData.properties.iso_a2)
                    }
                  />
                </G>
              ))}
          </G>
        </G>
      </Svg>

      {/* <ButtonRound
        onPress={() => setShowAddModal(true)}
        icon="+"
        style={{ position: "absolute", right: 10, bottom: 8 }}
      /> */}

      <MapLegend style={{ position: "absolute", left: 10, bottom: 8 }} />

      <CountriesReadChart
        amountCountries={booksPerCountry.length}
        amountRead={amountBooksRead}
        amountUnread={
          booksPerCountry.filter((book) => book.read === false).length
        }
        style={{ position: "absolute", right: 10, bottom: 8 }}
      />

      {/* <AddBookModal
        show={showAddModal}
        userId={userId}
        closeModal={() => setShowAddModal(false)}
        onBookListUpdate={onBookListUpdate}
        countries={booksPerCountry.map((book) => ({
          label: book.name,
          value: book.code,
        }))}
      /> */}

      {selectedCountry && (
        <BookModal
          bookItem={selectedCountry}
          closeModal={() => setSelectedCountry(null)}
          userId={userId}
          onBookListUpdate={onBookListUpdate}
        />
      )}
    </View>
  );
};

export default InteractiveMap;
