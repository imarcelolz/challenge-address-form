import { User } from '@/Models/User';
import { RouteComponentProps } from 'react-router-dom';

export type UserValidation = Partial<{ [key in keyof User]: string }>;

export interface AddressPageProps extends RouteComponentProps {
  searchCity?: (postalCode: string) => Promise<string[]>;
  validatePostalCode?: (value: number) => Promise<boolean>;
}

export interface AddressPageState {
  user: User;
  validation: UserValidation;
}
