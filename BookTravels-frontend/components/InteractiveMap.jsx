import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
// import { select } from "d3-selection";
import { feature } from "topojson";
import { COLORS } from "../utilities/styles/colors";

import countriesJson from "../assets/maps/countries.json";
// import ButtonRound from "./ButtonRound";
import MapLegend from "./MapLegend";
import BookModal from "./BookModal";
import CountriesReadChart from "./CountriesReadChart";

const InteractiveMap = ({
  booksPerCountry,
  userId,
  amountBooksRead,
  onBookListUpdate,
}) => {
  // Define a projection for your map
  const projection = geoNaturalEarth1().scale(150).translate([0, 0]);
  const mapHeightFactor = 0.85;
  const windowWidth = Dimensions.get("window").width;

  const [currentTranslation, setCurrentTranslation] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [geojson, setGeojson] = useState(null);

  const svgRef = useRef(null);
  const mapGroup = useRef(null);
  const mapCountries = useRef(null);
  const bookObj = useRef({});
  const pan = useRef(new Animated.ValueXY()).current;
  const previousDistance = useRef(null);
  // const scale = useRef(1);
  const scale = useRef(new Animated.Value(1.5)).current;

  // const handleZoom = Animated.event([{ nativeEvent: { scale: scale } }], {
  //   useNativeDriver: false,
  // });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        const touches = event.nativeEvent.touches;

        // Perform zoom calculation if there are two touch points
        const { dx, dy } = gestureState;

        if (touches.length >= 2) {
          const k = handleZoom(touches);
          pan.setValue({ x: dx, y: dy });
          scale.setValue(k);
        } else {
          // Perform pan calculation

          pan.setValue({ x: dx, y: dy });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();

        // Check if it's a tap event (no movement)
        // TODO: This seems to work only sometimes, figure out
        // if (Math.abs(gestureState.dx) < 2 && Math.abs(gestureState.dy) < 2) {
        //   const countryCode =
        //     e.target._internalFiberInstanceHandleDEV.memoizedProps
        //       .accessibilityLabel;

        //   if (countryCode) {
        //     handleCountryClick(countryCode);
        //   }
        // }
      },
    })
  ).current;

  useEffect(() => {
    createMap();

    bookObj.current = booksPerCountry.reduce((prev, next) => {
      prev[next.code] = next;
      return prev;
    }, {});
  }, []);

  useEffect(() => {}, []);

  function createMap() {
    const countries = feature(countriesJson, countriesJson.objects.countries);
    setGeojson(countries);
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

  const handleZoom = (touches) => {
    let newScale = scale._value || 1.5;

    const distance = Math.sqrt(
      Math.pow(touches[0].pageX - touches[1].pageX, 2) +
        Math.pow(touches[0].pageY - touches[1].pageY, 2)
    );

    if (previousDistance.current !== null) {
      const fraction = distance / previousDistance.current;

      // Prevent making big jumps in scale
      if (Math.abs(fraction - 1) < 0.1) {
        newScale = scale._value * fraction;
      }
    }
    previousDistance.current = distance;
    return newScale;
  };

  // {...panResponder.panHandlers}
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        pinchGestureEnabled={false}
        onScrollBeginDrag={() => setPreviousDistance(null)}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale: scale },
              ],
            },
          ]}
        >
          <Svg
            ref={svgRef}
            width={windowWidth}
            height={windowWidth * mapHeightFactor}
            viewBox={`${windowWidth * -1} ${
              windowWidth * -mapHeightFactor * 0.35
            } ${windowWidth * 2} ${windowWidth * mapHeightFactor}`}
            style={{ overflow: "visible" }}
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
                        accessibilityLabel={countryData.properties.iso_a2}
                      />
                    </G>
                  ))}
              </G>
            </G>
          </Svg>
        </Animated.View>
      </ScrollView>

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
