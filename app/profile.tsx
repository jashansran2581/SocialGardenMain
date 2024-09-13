import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Jashanpreet Singh Sran");
  const [birthday, setBirthday] = useState("6th April 2004");
  const [phone, setPhone] = useState("818 123 4567");
  const [instagram, setInstagram] = useState("@username");
  const [email, setEmail] = useState("info@example.com");
  const [password, setPassword] = useState("Password");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.profileIcon}
        />
        <Text style={styles.profileName}>{name}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Ionicons name="person-outline" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={name}
          editable={isEditing}
          onChangeText={setName}
        />
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="calendar-outline" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={birthday}
          editable={isEditing}
          onChangeText={setBirthday}
        />
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="call-outline" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={phone}
          editable={isEditing}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="logo-instagram" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={instagram}
          editable={isEditing}
          onChangeText={setInstagram}
        />
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="mail-outline" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={email}
          editable={isEditing}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#9b59b6" />
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          editable={isEditing}
          onChangeText={setPassword}
        />
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
        <Text style={styles.editButtonText}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    width: "100%",
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#9b59b6",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
