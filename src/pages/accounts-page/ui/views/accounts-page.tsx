import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components';

import { PageTemplate } from '@shared/ui/core/templates';
import { Typography } from '@shared/ui/core/typography';
import { styled } from '@shared/ui/theme';

import { TAccountListItem } from '../../types';

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
const MessageText = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

type Props = {
  data: TAccountListItem[];
  isLoading?: boolean;
  isRefetching?: boolean;
  hasError?: boolean;
  onAccountClick: (id: number) => void;
  onRefresh: () => void;
};

// Данный компонент ничего не знает о реальных данных
// и ожидает их в таком виде, которые нам необходимы
// для отображения
export const AccountsPage = ({
  data,
  isLoading,
  isRefetching,
  hasError,
  onAccountClick,
  onRefresh,
}: Props) => {
  const theme = useTheme();
  // Показываем заглушку при первой
  // загрузке и отсутствии данных
  if (isLoading) {
    return (
      <CenterPage>
        <ActivityIndicator color={theme.palette.accent.tertiary} />
      </CenterPage>
    );
  }

  // И показываем заглушку при ошибке
  if (hasError) {
    return (
      <CenterPage>
        <MessageText variant="body17Regular">
          {`Произошла ошибка!\nT__T`}
        </MessageText>
      </CenterPage>
    );
  }

  return (
    <PageTemplate>
      <FlatList
        data={data}
        // Проп для обновления данных при свайпе
        refreshControl={
          <RefreshControl
            tintColor={theme.palette.accent.tertiary}
            refreshing={Boolean(isRefetching)}
            onRefresh={onRefresh}
          />
        }
        // При пустом массиве показываем заглушку
        ListEmptyComponent={
          <MessageText variant="body17Regular">Ничего нет!</MessageText>
        }
        // Получаем ключи из уникальных айдишников
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <AccountWrapper onPress={() => onAccountClick(item.id)}>
            <TitleNumber variant="body20">
              {String(item.accountNumber)}
            </TitleNumber>
            <StatusText variant="body15Regular">{`Статус: ${item.status}`}</StatusText>
            <CardAmountText variant="caption1">
              {`Количество карт: ${item.cardAmount}`}
            </CardAmountText>
          </AccountWrapper>
        )}
      />
    </PageTemplate>
  );
};
