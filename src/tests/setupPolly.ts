import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, PollyConfig } from '@pollyjs/core';
import FsPersister from '@pollyjs/persister-fs';
import redact from 'redact-object';

import { Headers, decodeCassetteResponseBodies, encodeCassetteResponseBodies } from './cassetteHelpers';

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

interface SetUpPollyOptions extends PollyConfig {
  record?: boolean;
}

const SECRET_FIELDS = ['password', 'client_id', 'client_secret', 'access_token', 'refresh_token'];
const EXCLUDED_HEADERS = ['user-agent'];

const DEFAULT_CONFIG = {
  adapters: ['node-http'],
  persister: 'fs',
  persisterOptions: {
    fs: {
      recordingsDir: 'src/tests/cassettes',
    },
  },
  flushRequestsOnStop: true,
  recordIfMissing: false,
  recordFailedRequests: true,
  matchRequestsBy: {
    headers: false,
  },
};

const redactSecretFields = (jsonContent: string) => {
  const content = JSON.parse(jsonContent);
  const redactedContent = redact(content, SECRET_FIELDS);

  return JSON.stringify(redactedContent);
};

const filterHeaders = (headers: Headers) => {
  return headers.filter(({ name }) => !EXCLUDED_HEADERS.includes(name));
};

const setupPolly = (cassetteName: string, options?: SetUpPollyOptions) => {
  const polly = new Polly(cassetteName, DEFAULT_CONFIG);

  if (options?.record) polly.configure({ recordIfMissing: true });

  polly.server.any().on('beforePersist', (_req, recording) => {
    decodeCassetteResponseBodies(recording.response);

    recording.request.headers = filterHeaders(recording.request.headers);
    recording.request.postData.text = redactSecretFields(recording.request.postData.text);
    recording.response.content.text = redactSecretFields(recording.response.content.text);
  });

  polly.server.any().on('beforeReplay', (_, recording) => {
    encodeCassetteResponseBodies(recording.response);
  });

  return polly;
};

export { setupPolly };