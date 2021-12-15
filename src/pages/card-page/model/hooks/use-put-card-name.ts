import { useMutation, useQueryClient } from 'react-query';

import { AccountListResponse, fetchPutCardName } from '@shared/api';

const UPDATE_QUERY_KEY = 'accounts';

type Params = {
  accountId: number;
  cardId: string;
  name: string;
};

export const usePutCardName = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ accountId, cardId, name }: Params) => fetchPutCardName(cardId, name),
    {
      // !!! ВАЖНО !!!
      // Здесь показан пример оптимистичного обновления, чтобы вы
      // могли лучше разобраться в side-effect'ах useMutation.
      // Вам необязательно писать так же, будет достаточно инвалидации
      // как в примере с onSettled
      onMutate: params => {
        // Получаем текущие данные из кэша
        const currentData =
          queryClient.getQueryData<AccountListResponse>(UPDATE_QUERY_KEY);
        // Если получили кэшированные данные, то оптимистично
        // обновляем их на клиенте до получения ответа
        if (currentData) {
          const newData: AccountListResponse = {
            // Пробегаемся по всему массиву, заменяя данные только
            // в необходимом аккаунте и карточке
            accounts: currentData.accounts.map(account => {
              if (account.accountId === params.accountId) {
                return {
                  ...account,
                  cards: account.cards.map(card => {
                    if (card.card_id === params.cardId) {
                      return { ...card, name: params.name };
                    }
                    return card;
                  }),
                };
              }
              return account;
            }),
          };
          queryClient.setQueryData(UPDATE_QUERY_KEY, () => newData);
        }
        return currentData;
      },
      // В onSuccess, onError третий аргумент возвращает
      // данные, которые вы возврашаем из onMutate.
      // Там мы передавали текушие данные до выполнения запроса,
      // что при возникновении ошибки мы могли откатиться до них
      // при помощи setQueryData
      onError: (_, __, context) => {
        queryClient.setQueryData(UPDATE_QUERY_KEY, () => context);
      },
      // При любом выполнении запроса помечаем данные
      // по ключу "accounts" как устаревшие, чтобы
      // React-Query их мог перезапросить
      onSettled: () => {
        queryClient.invalidateQueries(UPDATE_QUERY_KEY);
      },
    },
  );
  return mutation;
};
