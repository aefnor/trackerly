import { Stack } from "expo-router";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
function CustomHeader({ navigation, title, path }: { navigation: any, title: string, path: string }) {
  return (
    <View style={styles.header}>
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push(path as any)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Sign In" path="/signin" />,
          })} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="signin" options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Sign Up" path="/signup" />,
          })} />
      <Stack.Screen name="food-entry" options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Food Entry" path="/food-entry" />,
          })} />
      <Stack.Screen name="signup" options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Sign Up" path="/signup" />,
          })} />
      <Stack.Screen name="agenda" options={({navigation}) => ({
        header: () => <CustomHeader navigation={navigation} title="Agenda" path="/agenda" />,
      })}/>
      
    </Stack>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 40,
    paddingLeft: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
  },
});