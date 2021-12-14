import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountsPageConnector } from '../accounts-page';
import { CardPageConnector } from '../card-page';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home">{() => <AccountsPageConnector />}</Stack.Screen>
      <Stack.Screen name="card">{() => <CardPageConnector />}</Stack.Screen>
    </Stack.Navigator>
  );
};
