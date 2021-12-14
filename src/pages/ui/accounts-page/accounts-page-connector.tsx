import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AccountsPage } from './accounts-page';

type NavigationProp = NativeStackNavigationProp<{ card: undefined }>;

export const AccountsPageConnector = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <AccountsPage
      onAccountClick={() => navigation.navigate('card')}
      data={[
        {
          accountNumber: 123,
          status: 'Активен',
          cardAmount: 500,
        },
      ]}
    />
  );
};
