import { ScrollView, ActivityIndicator } from 'react-native';

import { PageTemplate } from '@shared/ui/core/templates';
import { Typography } from '@shared/ui/core/typography';
import { styled } from '@shared/ui/theme';

import { TCardListItem } from './types';

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
const ErrorText = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

type Props = {
  data: TCardListItem[];
  isFetching?: boolean;
  hasError?: boolean;
  onNewName: (name: string) => void;
};

export const CardPage = ({ data, isFetching, hasError, onNewName }: Props) => {
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
          <CardWrapper key={item.cardNumber}>
            <TitleNumber variant="largeTitle">
              {String(item.cardNumber)}
            </TitleNumber>
            <NameText variant="body17Medium">{item.name}</NameText>
            <PaymentText variant="caption2">{item.paymentSystem}</PaymentText>
            <BottomButton onPress={() => onNewName('Карточка')}>
              <ButtonText variant="caption1">
                Заменить имя на "Карточка"
              </ButtonText>
            </BottomButton>
          </CardWrapper>
        ))}
      </ScrollView>
    </PageTemplate>
  );
};
