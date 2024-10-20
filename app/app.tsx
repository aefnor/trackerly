// // App.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// // import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// // import IndexScreen from '../screens/IndexScreen'; // Import the IndexScreen component

// export type RootStackParamList = {
//   Home: undefined;
//   Profile: undefined;
//   Index: undefined; // Add Index route to the param list
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Index"> // Change initial route to Index
//         <Stack.Screen name="Index" component={IndexScreen} /> // Add Index screen
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
