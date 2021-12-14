import { CardPage } from '.';

type Props = {};

export const CardPageConnector = ({}: Props) => {
  return (
    <CardPage
      onNewName={() => {}}
      data={[
        {
          cardNumber: 123123124,
          name: 'Моя карта',
          paymentSystem: 'Visa',
        },
      ]}
    />
  );
};
