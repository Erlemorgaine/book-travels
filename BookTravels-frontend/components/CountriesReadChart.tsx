import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { COLORS } from "../utilities/styles/colors";

type CountriesReadChartProps = {
  amountCountries;
  amountRead: number;
  amountUnread: number;
  style?: {};
};

const CountriesReadChart: React.FC<CountriesReadChartProps> = ({
  amountCountries,
  amountRead,
  amountUnread,
  style = {},
}) => {
  const windowWidth = Dimensions.get("window").width;
  const barWidth = windowWidth * 0.4;

  const [progressRead, setProgressRead] = useState(0);
  const [progressUnread, setProgressUnread] = useState(0);

  useEffect(() => {
    setProgressRead(amountRead / amountCountries);
  }, [amountRead]);

  useEffect(() => {
    setProgressUnread(amountUnread / amountCountries);
  }, [amountUnread]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        You read{" "}
        <Text style={styles.percentage}>{Math.round(progressRead * 100)}%</Text>{" "}
        of the world.
      </Text>

      <Text style={styles.label}>
        <Text style={styles.percentage}>{amountCountries - amountRead}</Text>{" "}
        more places to go!
      </Text>

      <View
        style={[styles.chart, { width: barWidth }]}
        accessible
        accessibilityLabel={`Bar chart showing that you read a book from ${Math.round(
          progressRead * 100
        )} percent of all ${amountCountries} countries, and saved a book to read later for ${Math.round(
          progressUnread * 100
        )} of all countries`}
      >
        <View
          style={[styles.readProgress, { width: progressRead * barWidth }]}
        />
        <View
          style={[styles.unreadProgress, { width: progressUnread * barWidth }]}
        />
      </View>
    </View>
  );
};

export default CountriesReadChart;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    // borderWidth: 1,
    // borderColor: COLORS.cardShadow,
  },
  label: {
    fontSize: 12,
  },
  percentage: {
    fontWeight: "bold",
  },
  chart: {
    marginTop: 8,
    height: 14,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: COLORS.neutral,
    shadowColor: COLORS.cardShadowDark,
    shadowOffset: { width: -2, height: -14 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5, // Necessary to show shadow for Android!
  },
  readProgress: {
    height: 14,
    backgroundColor: COLORS.primaryGreen,
  },
  unreadProgress: {
    height: 14,
    backgroundColor: COLORS.primaryRed,
  },
});
