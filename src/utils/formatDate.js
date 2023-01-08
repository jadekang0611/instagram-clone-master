import {
  format,
  formatDistanceStrict,
  isThisYear,
  formatDistanceToNow,
} from 'date-fns';

export function formatPostDate(date) {
  // MAY 11
  const formatShort = format(new Date(date), 'MMMM d').toUpperCase();

  // JUNE 11, 2022
  const formatLong = format(new Date(date), 'MMMM d, yyy').toUpperCase();
  return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNow(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true }).toUpperCase();
}

export function formatDateToNowShort(date) {
  // convert 2 days ago -> 2d
  return formatDistanceStrict(new Date(date), new Date(Date.now()))
    .split(' ')
    .map((s, i) => (i === 1 ? s[0] : s))
    .join('');
}
