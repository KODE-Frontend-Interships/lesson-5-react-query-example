import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountsPageConnector } from '@pages/accounts-page';
import { CardPageConnector } from '@pages/card-page';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home">{() => <AccountsPageConnector />}</Stack.Screen>
      <Stack.Screen name="card">{() => <CardPageConnector />}</Stack.Screen>
    </Stack.Navigator>
  );
};
