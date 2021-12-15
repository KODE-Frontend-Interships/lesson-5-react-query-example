export type CardModel = {
  card_id: string;
  number: string;
  status: 'ACTIVE' | 'DEACTIVATED';
  name: string;
  payment_system: 'Visa' | 'MasterCard' | 'МИР';
  card_type: 'physical' | 'digital';
};

export type AccountModel = {
  accountId: number;
  number: string;
  balance: number;
  currency: 'RUB';
  status: string;
  cards: CardModel[];
};

export type AccountListResponse = {
  accounts: AccountModel[];
};
