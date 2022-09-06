export enum TokenType {
  Bearer = 'Bearer',
}

export type Tokens = {
  tokenType: TokenType;
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  expiresIn: number;
};
