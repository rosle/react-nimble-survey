import { camelCase } from 'lodash';

const resolveInputIdFromName = (inputAttributes: React.AllHTMLAttributes<HTMLElement>) => {
  const id = inputAttributes?.id;
  const name = inputAttributes?.name;

  return id || (name && camelCase(name));
};

export { resolveInputIdFromName };
