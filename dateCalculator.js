"use strict";

/**
 * Validates if a voter is eligible to register based on the registration deadline.
 * @param {string} currentDate - The current date in YYYY-MM-DD format
 * @param {string} deadlineDate - The registration deadline in YYYY-MM-DD format
 * @returns {boolean} True if the current date is on or before the deadline, false otherwise
 */
function isRegistrationValid(currentDate, deadlineDate) {
  if (!currentDate || !deadlineDate) return false;
  
  const current = new Date(currentDate);
  const deadline = new Date(deadlineDate);
  
  if (isNaN(current.getTime()) || isNaN(deadline.getTime())) {
    return false;
  }
  
  return current.getTime() <= deadline.getTime();
}

/**
 * Calculates days remaining until the election.
 * @param {string} currentDate - The current date
 * @param {string} electionDate - The election date
 * @returns {number} Number of days remaining (0 if today, negative if passed)
 */
function daysUntilElection(currentDate, electionDate) {
  const current = new Date(currentDate);
  const election = new Date(electionDate);
  
  const diffTime = election.getTime() - current.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

module.exports = { isRegistrationValid, daysUntilElection };
