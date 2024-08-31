export interface EventInterface {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;  
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string; 
  organizer: {
    name: string;
    email: string;
  };
  image: string;
  maps: string;
}