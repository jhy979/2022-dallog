type DigitType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type YearType = `19${DigitType}${DigitType}` | `20${DigitType}${DigitType}`;

type MonthType = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;

type DateType =
  | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `1${DigitType}`
  | `2${DigitType}`
  | `3${0 | 1}`;

type DayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type HourType = `0${DigitType}` | `1${DigitType}` | `2${0 | 1 | 2 | 3}`;

type MinuteType = `${0 | 1 | 2 | 3 | 4 | 5}${DigitType}`;

type SecondType = MinuteType;

type UTCStringType =
  | `${number}-${number}-${number}T${number}:${number}:${number}`
  | `${number}-${number}-${number}T${number}:${number}`;

export {
  DateType,
  DayType,
  DigitType,
  HourType,
  MinuteType,
  MonthType,
  SecondType,
  UTCStringType,
  YearType,
};
