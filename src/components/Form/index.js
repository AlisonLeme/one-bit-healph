import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";

import ResultImc from "./ResultImc";

import styles from "./style";

const Form = () => {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImv] = useState("Preencha o peso e a altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMesaage, setErrorMessage] = useState("");
  const [imcList, setImcList] = useState([]);

  const imcCalculator = () => {
    let heightFormat = height.replace(",", "."); // formatando para IOS
    let totalImc = (weight / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    setImc(totalImc);
  };

  const verificationImc = () => {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
    }
  };

  const validationImc = () => {
    console.log(imcList);
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImv("Seu imc é igual:");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
      return;
    } else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImv("Preencha o peso e a altura");
    }
  };

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable style={styles.form} onPress={Keyboard.dismiss}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMesaage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. 1.75"
            keyboardType="numeric"
            onChangeText={setHeight}
            value={height}
          ></TextInput>
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMesaage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. 75.50"
            keyboardType="numeric"
            onChangeText={setWeight}
            value={weight}
          ></TextInput>
          <TouchableOpacity
            onPress={() => validationImc()}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exibitionResultImc}>
          <ResultImc message={messageImc} result={imc} />
          <TouchableOpacity
            onPress={() => validationImc()}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewResultImcList}>
              <Text style={styles.textResultItemList}>Resultado IMC = </Text>
              <Text style={styles.resultImcItem}>{item.imc}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => {
          item.id;
        }}
      />
    </View>
  );
};

export default Form;
