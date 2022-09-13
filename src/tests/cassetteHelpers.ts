// There's no option on Polly yet but there are already some works done.
// Ref: https://github.com/Netflix/pollyjs/issues/463
import { gunzipSync, gzipSync } from 'zlib';

type Header = { name: string; value: string };
export type Headers = [Header];

type ResponseContent = {
  mimeType: string;
  text: string;
  encoding: string;
  size: number;
};

type Response = {
  headers: [Header];
  content: ResponseContent;
  bodySize: number;
};

const charset = 'utf8';
const encoding = 'base64';

const hasHeader =
  (headers: Headers) =>
  ([key, value]: [string, string | ((value: string) => boolean)]) =>
    headers.some((header) => (header.name === key && typeof value === 'function' ? value(header.value) : header.value === value));

const headerValueDelimiter = /,\s*/;
const headerValueContains = (valueToFind: string) => (headerValue: string) =>
  headerValue.split(headerValueDelimiter).includes(valueToFind);

const isContentChunked = (headers: Headers) => hasHeader(headers)(['transfer-encoding', headerValueContains('chunked')]);

const isContentGzipped = (headers: Headers) => hasHeader(headers)(['content-encoding', headerValueContains('gzip')]);

const decodeCassetteResponseBodies = (response: Response) => {
  const { content, headers } = response;

  if (!isContentGzipped(headers) || content.size === 0) {
    return;
  }

  const chunks = JSON.parse(content.text);

  if (isContentChunked(headers)) {
    const chunkBuffers = [];

    for (let i = 0; i < chunks.length; i += 1) {
      const decodedBuffer = Buffer.from(chunks[i], encoding);
      chunkBuffers.push(decodedBuffer);
    }

    const allBuffers = Buffer.concat(chunkBuffers);
    const unzipped = gunzipSync(allBuffers);

    content.text = unzipped.toString(charset);
  } else {
    throw Error('Unchunked content has no cassette decoding logic and will need to be configured.');
  }
};

const encodeCassetteResponseBodies = (response: Response) => {
  const { content, headers } = response;
  if (!isContentGzipped(headers)) {
    return;
  }

  const unzipped = Buffer.from(content.text, charset);
  const zipped = gzipSync(unzipped);
  const base64String = zipped.toString(encoding);
  const body = isContentChunked(headers)
    ? // re-chunk the content
      [base64String.slice(0, 20), base64String.substring(20)] // making the first chunk 20 chars, as it seems to match polly's typical result
    : base64String;
  content.text = JSON.stringify(body);

  // recalculating the content size in case manual editing of data changes the size
  content.size = content.text.length;
  response.bodySize = content.text.length;
};

export { decodeCassetteResponseBodies, encodeCassetteResponseBodies };
