const FULL_DATE_FORMAT_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const FULL_DATE_FORMAT_WITH_TIMEZONE_OPTIONS = {
  ...FULL_DATE_FORMAT_OPTIONS,
  timeZoneName: "short",
};

const OFFSET_REGEXP = /([+-]\d{2}):(\d{2})$/;
const MINUTES_IN_HOUR = 60;

function getOffsetMinutes(hours, minutes) {
  let sign = hours < 0 ? -1 : 1;
  return hours * MINUTES_IN_HOUR + sign * minutes;
}

function getGMTLabel(hours, minutes) {
  let hPrefix = hours > 0 ? '+' : '';
  let hLabel = hours ? hPrefix + hours : '';
  let mLabel = minutes ? ':' + minutes : '';

  return `GMT${hLabel}${mLabel}`;
}

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl
      .DateTimeFormat("en-US", FULL_DATE_FORMAT_WITH_TIMEZONE_OPTIONS)
      .format(new Date(timestamp));
}

export function formatIncomingLocalDateTime(timestamp) {
  let date = new Date(timestamp);

  let formatSuffix = '';
  let formatOptions = FULL_DATE_FORMAT_OPTIONS;

  let offsetMatch = timestamp.match(OFFSET_REGEXP);

  if (offsetMatch) {
    let offsetHours = Number(offsetMatch[1]);
    let offsetMinutes = Number(offsetMatch[2]);
    formatSuffix = ` ${getGMTLabel(offsetHours, offsetMinutes)}`;

    let localOffsetMinutes = date.getTimezoneOffset();
    let incomingOffsetMinutes = getOffsetMinutes(offsetHours, offsetMinutes);

    date.setMinutes(date.getMinutes() + localOffsetMinutes + incomingOffsetMinutes);
  } else {
    formatOptions.timeZoneName = "short";
    formatOptions.timeZone = "UTC";
  }

  let fullDatetime = new Intl
      .DateTimeFormat("en-US", formatOptions)
      .format(date);

  return fullDatetime + formatSuffix;
}

export const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
