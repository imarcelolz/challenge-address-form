import { User } from '@/Models/User';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

export type SuccessPageProps = RouteComponentProps<{}, StaticContext, { user: User }>;
export type SuccessPageState = {};
