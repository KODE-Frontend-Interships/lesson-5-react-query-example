import { useGetAccoutList } from '@pages/accounts-page';
import { TAccountListItem } from '@pages/accounts-page/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AccountsPage } from '../views/accounts-page';

type NavigationProp = NativeStackNavigationProp<{
  card: { accountId: number };
}>;

export const AccountsPageConnector = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, error, refetch, isRefetching } = useGetAccoutList();

  const newData: TAccountListItem[] =
    data?.accounts.map(account => ({
      id: account.accountId,
      accountNumber: account.number,
      status: account.status,
      cardAmount: account.cards.length,
    })) ?? [];

  return (
    <AccountsPage
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasError={Boolean(error)}
      onAccountClick={(accountId: number) =>
        navigation.navigate('card', { accountId })
      }
      onRefresh={refetch}
      data={newData}
    />
  );
};
