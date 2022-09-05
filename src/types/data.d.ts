export type Tokens = {
  tokenType: 'Bearer';
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  expiresIn: number;
};

export type User = {
  email: string;
  name: string;
  avatarUrl: string;
};
