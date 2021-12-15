const putCardName = (id: string, name: string) => {
  return fetch(
    // Сервер с моками
    `https://stoplight.io/mocks/kode-education/kode-bank/27774161/api/core/card/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someToken',
      },
      body: `{"newName":${name}}`,
    },
  );
};

export const fetchPutCardName = async (id: string, name: string) => {
  // Cпециальная задержка, чтобы можно было
  // проверить работу мутации в деле.
  // Это только для демонстрации!
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });
  putCardName(id, name);
};
