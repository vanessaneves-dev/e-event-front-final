export interface EventFavConfInterface {
  id: string;
  userId: string;
  eventId: string;
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
  };
  isConfirmed: boolean;
  isFavorited: boolean;
}