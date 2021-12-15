import { RouteProp, useRoute } from '@react-navigation/native';

import { useGetAccoutList } from '@pages/accounts-page';
import { usePutCardName } from '@pages/card-page';

import { TCardListItem } from '../../types';
import { CardPage } from '..';

type CardPageRouteProps = RouteProp<{ card: { accountId: number } }>;

type Props = {};

export const CardPageConnector = ({}: Props) => {
  const route = useRoute<CardPageRouteProps>();
  const { mutateAsync, isLoading: isFetchingMutation } = usePutCardName();
  const { data, isLoading, error, refetch, isRefetching } = useGetAccoutList();

  const cardsData: TCardListItem[] =
    data?.accounts
      .find(account => account.accountId === route.params.accountId)
      ?.cards.map(card => ({
        id: card.card_id,
        cardNumber: card.number,
        name: card.name,
        paymentSystem: card.payment_system,
      })) ?? [];

  return (
    <CardPage
      isLoading={isLoading}
      isFetching={isRefetching}
      isUpdatingCards={isFetchingMutation}
      hasError={Boolean(error)}
      onRefresh={refetch}
      updateCardName={(id, name) =>
        mutateAsync({ cardId: id, name, accountId: route.params.accountId })
      }
      data={cardsData}
    />
  );
};
