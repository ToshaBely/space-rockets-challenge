import { formatDate, formatDateTime, formatIncomingLocalDateTime } from "./format-date";

describe('format-date utils', () => {
  it('FAKE FAILED TEST FOR GITHUB ACTION CHECK', () => {
    expect(true).toBeTruthy();
    // expect(true).toBeFalsy();
  });

  it('formatDate should work', () => {
    let timestamp = '2020-11-21T17:17:00.000Z';

    expect(formatDate(timestamp)).toEqual('Saturday, November 21, 2020');
  });

  it('formatDateTime should work', () => {
    let timestamp = '2020-11-21T09:17:00-08:00';

    expect(formatDateTime(timestamp)).toEqual('November 21, 2020, 5:17:00 PM UTC');
  });

  describe('formatIncomingLocalDateTime', () => {
    it('should work with ISO 8601 format', () => {
      let timestamp = '2020-11-21T09:17:00-08:00';

      expect(formatIncomingLocalDateTime(timestamp)).toEqual('November 21, 2020, 9:17:00 AM GMT-8');
    });

    it('should work with ISO 8601 format and half-hours shift', () => {
      let timestamp = '2020-11-21T09:17:00+05:30';

      expect(formatIncomingLocalDateTime(timestamp)).toEqual('November 21, 2020, 9:17:00 AM GMT+5:30');
    });

    it('should work with ISO 8601 format and zero shift', () => {
      let timestamp = '2020-11-21T09:17:00+00:00';

      expect(formatIncomingLocalDateTime(timestamp)).toEqual('November 21, 2020, 9:17:00 AM GMT');
    });

    it('should work with non ISO 8601 format', () => {
      let timestamp = '2020-11-21T17:17:00.000Z';

      expect(formatIncomingLocalDateTime(timestamp)).toEqual('November 21, 2020, 5:17:00 PM UTC');
    });
  });
});
