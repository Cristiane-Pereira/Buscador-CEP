import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const inputRefValue = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpaAreaCep() {
    setCep("");
    inputRefValue.current.focus();
    setCepUser(null);
  }

  async function buscaCep() {
    if (cep == "") {
      alert("Dígite um cep válido");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
      console.log(response.data);
    } catch (error) {
      console.log("ERROR:" + error);
    }
  }

  useEffect(() => {
    buscaCep();
  }, [buscaCep]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Dígite um cep para a busca</Text>

        <TextInput
          placeholder="Ex: 78991400"
          style={styles.input}
          onChangeText={(pegaValorInput) => setCep(pegaValorInput)}
          value={cep}
          keyboardType={"numeric"}
          ref={inputRefValue}
        />
      </View>

      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button_1} onPress={buscaCep}>
          <Text style={styles.textButton}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_2} onPress={limpaAreaCep}>
          <Text style={styles.textButton}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser !== null ? (
        <View style={styles.resultado}>
          <Text style={styles.itemBusca}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemBusca}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemBusca}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemBusca}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemBusca}>Estado: {cepUser.uf}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaButton: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
  button_1: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#ff0000",
  },
  button_2: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#0ff",
  },
  textButton: {
    fontSize: 22,
    color: "#fff",
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemBusca: {
    fontSize: 22,
  },
});
