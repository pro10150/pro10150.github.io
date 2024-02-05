import { differenceInMonths, differenceInYears } from 'date-fns';

function calculateDateDifference(startDate, endDate) {

  const yearDiff = differenceInYears(endDate, startDate);
  const monthDiff = differenceInMonths(endDate, startDate) % 12;

  return { years: yearDiff, months: monthDiff };
}

  export default calculateDateDifference