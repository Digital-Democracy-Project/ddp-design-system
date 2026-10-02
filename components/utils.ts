import { Keys, Values } from './types';

export const BrandTones = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
} as const);

export const ValenceTones = Object.freeze({
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  CAUTION: 'caution',
  INFO: 'info',
} as const);

export const PartyTones = Object.freeze({
  DEM: 'democratic',
  REP: 'republican',
  UNAFFILIATED: 'unaffiliated',
} as const);

export const AllColorTones = Object.freeze({
  NEUTRAL: 'neutral',
  ...BrandTones,
  ...ValenceTones,
  ...PartyTones,
} as const);

export const Sizes = Object.freeze({
  NONE: 'none',
  XS: 'xs',
  S: 'sm',
  M: 'md',
  L: 'lg',
  XL: 'xl',
  XXL: 'xxl',
  // TODO: verify the actual values and how they're used.
});

export const getSizeOptions = (num: number): Array<Values<typeof Sizes>> => {
  switch (num) {
    case 1:
      return [Sizes.M];
    case 2:
      return [Sizes.S, Sizes.L];
    case 3:
      return [Sizes.S, Sizes.M, Sizes.L];
    case 5:
      return [Sizes.XS, Sizes.S, Sizes.M, Sizes.L, Sizes.XL];
    default:
      return Object.values(Sizes).filter((size) => size !== Sizes.NONE);
  }
}