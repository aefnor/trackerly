import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button, ScrollView, Alert } from 'react-native';


type EditProfileScreenNavigationProp = any;

const EditProfileScreen = ({ navigation }: { navigation: EditProfileScreenNavigationProp }) => {
  // State variables for the profile fields
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [goal, setGoal] = useState("Lose 10 lbs");

  const handleSave = () => {
    // Handle save action, like updating user profile data
    Alert.alert("Profile Updated", "Your changes have been saved.");
    navigation.goBack(); // Go back to ProfileScreen after saving
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://example.com/profile-picture.png' }} // Replace with actual profile picture URL
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton}>
          <Text style={styles.editImageText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        
        <Text style={styles.label}>Fitness Goal</Text>
        <TextInput
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          placeholder="Enter your fitness goal"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#3b5998',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editImageText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfileScreen;
