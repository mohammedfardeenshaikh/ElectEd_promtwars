"use strict";

const { isRegistrationValid, daysUntilElection } = require('./dateCalculator');

describe('Election Date Calculator Tests', () => {
  describe('isRegistrationValid', () => {
    it('should return true if current date is before the deadline', () => {
      expect(isRegistrationValid('2024-09-01', '2024-10-01')).toBe(true);
    });

    it('should return true if current date is exactly the deadline', () => {
      expect(isRegistrationValid('2024-10-01', '2024-10-01')).toBe(true);
    });

    it('should return false if current date is after the deadline', () => {
      expect(isRegistrationValid('2024-10-02', '2024-10-01')).toBe(false);
    });

    it('should return false for invalid date strings', () => {
      expect(isRegistrationValid('invalid-date', '2024-10-01')).toBe(false);
    });
  });

  describe('daysUntilElection', () => {
    it('should return positive number for future election', () => {
      expect(daysUntilElection('2024-10-01', '2024-10-05')).toBe(4);
    });

    it('should return 0 if election is today', () => {
      expect(daysUntilElection('2024-11-05', '2024-11-05')).toBe(0);
    });

    it('should return negative number if election has passed', () => {
      expect(daysUntilElection('2024-11-06', '2024-11-05')).toBe(-1);
    });
  });
});
