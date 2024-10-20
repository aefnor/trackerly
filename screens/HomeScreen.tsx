// // screens/HomeScreen.tsx
// import React from 'react';
// import { Button, View, Text, StyleSheet } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../app/app';

// type Props = StackScreenProps<RootStackParamList, 'Home'>;

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;
