import React from "react";
import { Text, View } from "react-native";

import styles from "./style";

const ResultImc = ({ result, message }) => {
  return (
    <View style={styles.resultImc}>
      <Text style={styles.information}>{message}</Text>
      <Text style={styles.numberImv}>{result}</Text>
    </View>
  );
};

export default ResultImc;
