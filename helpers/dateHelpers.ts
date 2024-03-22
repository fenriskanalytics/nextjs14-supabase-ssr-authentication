// utils/dateHelpers.ts

export function calculateDateRange(period: string): { startDate: string, endDate: string } {
    const today = new Date();
    let startDate = new Date();
    let endDate = today; // End date is always 'today' for these periods.
  
    const adjustDate = (date: Date, adjustments: { days?: number, months?: number, years?: number }) => {
      if (adjustments.days) date.setDate(date.getDate() - adjustments.days);
      if (adjustments.months) date.setMonth(date.getMonth() - adjustments.months);
      if (adjustments.years) date.setFullYear(date.getFullYear() - adjustments.years);
      return date;
    };
  
    switch (period) {
      case '5-days':
        startDate = adjustDate(new Date(), { days: 5 });
        break;
      case '14-days':
        startDate = adjustDate(new Date(), { days: 14 });
        break;
      case '1-month':
        startDate = adjustDate(new Date(), { months: 1 });
        break;
      case '3-months':
        startDate = adjustDate(new Date(), { months: 3 });
        break;
      case '6-months':
        startDate = adjustDate(new Date(), { months: 6 });
        break;
      case 'YTD':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case '1-year':
        startDate = adjustDate(new Date(), { years: 1 });
        break;
      case '3-year':
        startDate = adjustDate(new Date(), { years: 3 });
        break;
      case '5-year':
        startDate = adjustDate(new Date(), { years: 5 });
        break;
      case '10-year':
        startDate = adjustDate(new Date(), { years: 10 });
        break;
      case 'Custom':
        // Custom will be handled differently, likely through user input
        break;
      default:
        throw new Error('Invalid time period specified');
    }
  
    // Format to YYYY-MM-DD
    const formatAsISODate = (date: Date) => date.toISOString().split('T')[0];
  
    return {
      startDate: formatAsISODate(startDate),
      endDate: formatAsISODate(endDate)
    };
  }
  