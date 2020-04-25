import { User } from '@/Models/User';
import { UserValidation } from '../Address.types';

export interface FormViewProps {
  onChange: (user: Partial<User>) => void;
  onSearch?: (query: string) => Promise<string[]>;
  onSubmit: () => void;
  user?: User;
  validate?: (user: Partial<User>) => any;
  validation?: UserValidation;
}
