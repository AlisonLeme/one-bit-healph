import React from "react";
import { Text, View, TouchableOpacity, Share } from "react-native";

import styles from "./style";

const ResultImc = ({ result, message }) => {
  const onShare = async () => {
    const resultImc = await Share.share({
      message: "Meu imc hoje é: " + result,
    });
  };

  return (
    <View style={styles.resultImc}>
      <View style={styles.boxShareButton}>
        <Text style={styles.information}>{message}</Text>
        <Text style={styles.numberImv}>{result}</Text>
        <TouchableOpacity style={styles.shared} onPress={onShare}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultImc;
