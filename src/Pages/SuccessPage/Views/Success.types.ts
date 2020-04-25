import { User } from '@/Models/User';

export interface SuccessViewProps {
  user: User;
  onBack: () => void;
}
