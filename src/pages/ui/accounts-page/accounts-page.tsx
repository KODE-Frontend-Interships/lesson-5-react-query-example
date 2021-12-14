import { ActivityIndicator, ScrollView } from 'react-native';

import { PageTemplate } from '@shared/ui/core/templates';
import { Typography } from '@shared/ui/core/typography';
import { styled } from '@shared/ui/theme';

import { TAccountListItem } from './types';

const CenterPage = styled(PageTemplate)`
  justify-content: center;
  align-items: center;
`;
const AccountWrapper = styled.TouchableOpacity`
  margin: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.content.primary};
  border-radius: 8px;
  overflow: hidden;
`;
const TitleNumber = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;
const StatusText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;
const CardAmountText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const ErrorText = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

type Props = {
  data: TAccountListItem[];
  isFetching?: boolean;
  hasError?: boolean;
  onAccountClick: () => void;
};

export const AccountsPage = ({
  data,
  isFetching,
  hasError,
  onAccountClick,
}: Props) => {
  if (isFetching) {
    return (
      <CenterPage>
        <ActivityIndicator />
      </CenterPage>
    );
  }

  if (hasError) {
    return (
      <CenterPage>
        <ErrorText variant="body17Regular">
          {`Произошла ошибка!\nT__T`}
        </ErrorText>
      </CenterPage>
    );
  }

  return (
    <PageTemplate>
      <ScrollView>
        {data.map(item => (
          <AccountWrapper onPress={onAccountClick} key={item.accountNumber}>
            <TitleNumber variant="body20">
              {String(item.accountNumber)}
            </TitleNumber>
            <StatusText variant="body15Regular">{`Статус: ${item.status}`}</StatusText>
            <CardAmountText variant="caption1">
              {`Количество карт: ${item.cardAmount}`}
            </CardAmountText>
          </AccountWrapper>
        ))}
      </ScrollView>
    </PageTemplate>
  );
};
