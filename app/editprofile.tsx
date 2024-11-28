import EditProfileScreen from '@/screens/EditProfileScreen';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const navigation = useNavigation<any>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic to update the user profile here
  };

  return(
    <EditProfileScreen navigation={navigation}>
      {/* Add your form elements here */}
    </EditProfileScreen>
  );
};

export default EditProfile;
