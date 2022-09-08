import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Vibration,
  Pressable,
  Keyboard,
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

  const imcCalculator = () => {
    let heightFormat = height.replace(",", "."); // formatando para IOS
    return setImc((weight / (heightFormat * heightFormat)).toFixed(2));
  };

  const verificationImc = () => {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
    }
  };

  const validationImc = () => {
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImv("Seu imc é igual:");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
      return;
    }
    verificationImc();
    setImc(null);
    setTextButton("Calcular");
    setMessageImv("Preencha o peso e a altura");
  };

  return (
    <Pressable style={styles.formContext} onPress={Keyboard.dismiss}>
      <View style={styles.form}>
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
      </View>
      <ResultImc message={messageImc} result={imc} />
    </Pressable>
  );
};

export default Form;
