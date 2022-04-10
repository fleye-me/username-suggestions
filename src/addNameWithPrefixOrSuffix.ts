import { AddNameWithPrefixOrSuffixDto } from './dtos/addNameWithPrefixOrSuffix.dto';

export const addNameWithPrefixOrSuffix = ({
  name,
  prefix,
  suffix,
}: AddNameWithPrefixOrSuffixDto) => {
  if (prefix) return `${prefix}${name}`;
  if (suffix) return `${name}${suffix}`;

  return name;
};
