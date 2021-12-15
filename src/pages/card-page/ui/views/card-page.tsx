import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components';

import { PageTemplate } from '@shared/ui/core/templates';
import { Typography } from '@shared/ui/core/typography';
import { styled } from '@shared/ui/theme';

import { TCardListItem } from '../../types';

const CenterPage = styled(PageTemplate)`
  justify-content: center;
  align-items: center;
`;
const CardWrapper = styled.View`
  margin: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.content.primary};
  border-radius: 8px;
  overflow: hidden;
`;
const TitleNumber = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
const NameText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
const PaymentText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
const BottomButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)}px
    ${({ theme }) => theme.spacing(3)}px;
  background-color: ${({ theme }) => theme.palette.button.primary};
`;
const ButtonText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;
const MessageText = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;
const UpdateInfo = styled.View`
  margin: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px 0;
  padding: ${({ theme }) => theme.spacing(1)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.accent.secondary};
  border-radius: 8px;
  overflow: hidden;
`;

type Props = {
  data: TCardListItem[];
  isLoading?: boolean;
  isFetching?: boolean;
  isUpdatingCards?: boolean;
  hasError?: boolean;
  updateCardName: (id: string, name: string) => void;
  onRefresh: () => void;
};

export const CardPage = ({
  data,
  isLoading,
  isFetching,
  isUpdatingCards,
  hasError,
  updateCardName,
  onRefresh,
}: Props) => {
  const theme = useTheme();
  if (isLoading) {
    return (
      <CenterPage>
        <ActivityIndicator color={theme.palette.accent.tertiary} />
      </CenterPage>
    );
  }

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
        refreshControl={
          <RefreshControl
            refreshing={Boolean(isFetching)}
            onRefresh={onRefresh}
            tintColor={theme.palette.accent.tertiary}
          />
        }
        ListEmptyComponent={
          <MessageText variant="body17Regular">Тут полная пустота!</MessageText>
        }
        ListHeaderComponent={() =>
          isUpdatingCards ? (
            <UpdateInfo>
              <ButtonText variant="body15Regular">Обновляем имена!</ButtonText>
              <ActivityIndicator color={theme.palette.accent.tertiary} />
            </UpdateInfo>
          ) : null
        }
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CardWrapper>
            <TitleNumber variant="largeTitle">{item.cardNumber}</TitleNumber>
            <NameText variant="body17Medium">{item.name}</NameText>
            <PaymentText variant="caption2">{item.paymentSystem}</PaymentText>
            <BottomButton
              disabled={isUpdatingCards}
              onPress={() => updateCardName(item.id, 'Карточка')}
            >
              <ButtonText variant="caption1">
                Заменить имя на "Карточка"
              </ButtonText>
            </BottomButton>
          </CardWrapper>
        )}
      />
    </PageTemplate>
  );
};
