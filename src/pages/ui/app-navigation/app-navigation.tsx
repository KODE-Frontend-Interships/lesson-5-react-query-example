import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home">
        {props => (
          <View style={styles.container} {...props}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>{JSON.stringify(process.env)}</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}
            >
              <Text>Go to profile!</Text>
            </TouchableOpacity>
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="profile">
        {props => (
          <View style={styles.container} {...props}>
            <Text>Profile page!</Text>
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
