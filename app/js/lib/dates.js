/** Dates module.

    This module contains miscellaneous functionality for the use of data within
    this prototype.

*/

/**
 * Create an array of date values representing a period of time.

 * @param {date} startDate - The start date for the period
 * @param {date} endDate - The end date for the period (inclusive)
 * @param {date -> bool} excludePredicate - An optional function to determine
 * which dates to skip within the range (where this value is true, the date is
 * skipped)
 */
function makePeriod(startDate, endDate, excludePredicate) {
  let dayLength = 24 * 60 * 60 * 1000, // Day length in ms
      periodLength = Math.round((endDate - startDate) / dayLength);
  if (startDate >= endDate) {
    return [];
  } else {
    return [...Array(periodLength).keys()].reduce((periodDates, dayNumber) => {
      let nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + dayNumber);
      if (excludePredicate && excludePredicate(nextDate)) {
        return periodDates;
      } else {
        return periodDates.concat([nextDate]);
      }
    }, []);
  };
};

/**
 * Add a number of days to a date.
 *
 * @param {Date} date - the date to which to add days
 * @param {Integer} days - the number of days to add
 * @returns {Date} - the modified date 
 */
function addDays(date, days) {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Calculate the difference between two dates.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Integer} - the number of days between two dates 
 */
function dateDiff(date1, date2) {
  let milliseconds = date2 - date1;
  return Math.round(Math.abs(milliseconds / (1000 * 60 * 60 * 24)));
}

export { makePeriod, addDays, dateDiff };
