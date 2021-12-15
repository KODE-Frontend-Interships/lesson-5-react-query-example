import { AccountListResponse } from '.';

export const fetchAccountList = async (): Promise<AccountListResponse> => {
  const response = await fetch(
    // Обращаемся к серверу с моками
    'https://stoplight.io/mocks/kode-education/kode-bank/27774161/api/core/account/list',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someToken',
      },
    },
  );
  const data = response.json();
  return data;
};
