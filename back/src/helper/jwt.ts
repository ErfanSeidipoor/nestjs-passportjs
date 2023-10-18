import { User } from '../entities';

export interface IToken {
  username: string;
  id: string;
  createdAt: Date;
}

export const generateUserToken = (user: User): IToken => ({
  username: user.username,
  id: user.id,
  createdAt: new Date(),
});
