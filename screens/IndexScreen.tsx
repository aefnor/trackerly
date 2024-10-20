// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../app/app';

// type Props = StackScreenProps<RootStackParamList, 'Index'>;

// const IndexScreen: React.FC<Props> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Trackerly</Text>
//       <Text style={styles.subtitle}>Your personal tracking assistant</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Go to Home"
//           onPress={() => navigation.navigate('Home')}
//         />
//         <Button
//           title="View Profile"
//           onPress={() => navigation.navigate('Profile')}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     width: '80%',
//   },
// });

// export default IndexScreen;
