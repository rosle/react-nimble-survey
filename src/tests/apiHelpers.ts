import * as fs from 'fs';

import { camelizeKeys } from 'humps';

const readApiResponseFromFixtures = (fileName: string) => {
  const rawResponse = fs.readFileSync(`src/tests/fixtures/${fileName}`, 'utf-8');
  const jsonResponse = JSON.parse(rawResponse);

  return camelizeKeys(jsonResponse);
};

export { readApiResponseFromFixtures };
