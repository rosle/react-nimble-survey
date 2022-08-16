import _ from 'lodash';

const resolveInputIdFromName = (inputAttributes: React.AllHTMLAttributes<HTMLElement>) => {
  const id = inputAttributes?.id;
  const name = inputAttributes?.name;

  return id || (name && _.camelCase(name));
};

export { resolveInputIdFromName };
