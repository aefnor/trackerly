import api from '@/axios/api';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

// Define the type for the form fields
interface SignupForm {
  username: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupForm>({
    username: '',
    email: '',
    password_hash: '',
    first_name: '',
    last_name: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Handle form field changes
  const handleChange = (name: keyof SignupForm, value: string) => {
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message on input change
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success message

    // Basic validation
    if (!formData.username || !formData.email || !formData.password_hash) {
      setError('All fields are required.');
      return;
    }

    // Simulate a signup process (replace this with your API call)
    try {
      // Simulating an API request
      await api.post('/signup/', formData);
      setSuccess('Signup successful! Please check your email for verification.');
      setFormData({
        username: '',
        email: '',
        password_hash: '',
        first_name: '',
        last_name: '',
      }); // Clear form
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#000" 
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000" 
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000" 
        value={formData.password_hash}
        onChangeText={(value) => handleChange('password_hash', value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#000" 
        value={formData.first_name}
        onChangeText={(value) => handleChange('first_name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#000" 
        value={formData.last_name}
        onChangeText={(value) => handleChange('last_name', value)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Signup;
