import { buildTokens } from 'tests/factories/tokens';
import { buildUser } from 'tests/factories/user';
import { Tokens } from 'types/tokens';
import { User } from 'types/user';

const mockTokens: Tokens = buildTokens();
const mockUser: User = buildUser();

const login = (user: Nullable<User> = mockUser, tokens: Nullable<Tokens> = mockTokens) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

Cypress.Commands.add('login', login);
