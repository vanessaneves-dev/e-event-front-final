export interface EventInterface {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  location: {
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
  };
  organizer: {
    name: string;
    email: string;
  };
  image: string;
}