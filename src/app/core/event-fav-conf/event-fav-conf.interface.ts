export interface EventFavConfInterface {
  id: string;
  userId: string;
  eventId: string;
  event: {
    title: string;
    description: string;
    date: string;
    time: string;               // Adiciona a hora do evento
    image: string;              // Adiciona a imagem do evento
    maps: string;               // Adiciona o link para o mapa
    organizer: {                // Adiciona os dados do organizador
      name: string;
      email: string;
    };
    category: string;  
    street: string;
    number: string;
    city: string;
    state: string;
  };
  isConfirmed: boolean;
  isFavorited: boolean;
}