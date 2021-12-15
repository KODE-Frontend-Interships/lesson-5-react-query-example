import { useQuery } from 'react-query';

import { fetchAccountList } from '@shared/api';

// Ключ, по которому будут кэшироваться данные
const QUERY_KEY = 'accounts';
// Время, в течении которого данными
// будут считаться активными
const STALE_TIME = 1000 * 60 * 10;

export const useGetAccoutList = () => {
  const query = useQuery(QUERY_KEY, () => fetchAccountList(), {
    staleTime: STALE_TIME,
  });
  return query;
};
