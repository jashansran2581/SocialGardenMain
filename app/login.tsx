import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";

export default function Login({ navigation }: any) {
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  // Validation function
  const validate = (values: { email: string; password: string }) => {
    let errorMessages = { email: "", password: "" };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.email) {
      errorMessages.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errorMessages.email = "Invalid email format";
    }

    if (!values.password) {
      errorMessages.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
      errorMessages.password = "Password must contain at least 8 characters, including uppercase, lowercase, and numbers";
    }

    return errorMessages;
  };

  const handleInput = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      console.log("Login Successful");
      // You can navigate to HomeScreen or any other screen after successful login
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Sign-in</Text>

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={values.email}
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => handleInput("email", text)}
          />
          {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            placeholderTextColor="#A9A9A9"
            value={values.password}
            onChangeText={(text) => handleInput("password", text)}
          />
          {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>Agree to terms and policies</Text>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[styles.buttonText, { color: "#000" }]}>Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Define styles here
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#f8f9fa",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6c757d",
    marginVertical: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
