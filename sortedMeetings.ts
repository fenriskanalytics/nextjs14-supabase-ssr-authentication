import { CombinedMeeting } from "@/types/combinedMeetingTypes";

// utils.ts
export const filterMeetingsByDays = (meetings: CombinedMeeting[], days: number) => {
    const currentDate = new Date();
    const filteredMeetings = meetings.filter((meeting) => {
      const meetingDate = meeting.confirmed_datetime || meeting.tentative_date;
      if (!meetingDate) return false; // Skip if meetingDate is null
      const timeDifference =
        currentDate.getTime() - new Date(meetingDate).getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return daysDifference <= days;
    });
    return filteredMeetings;
  };
  
  export const sortMeetingsByDate = (meetings: CombinedMeeting[], ascending: boolean) => {
    const sortedMeetings = [...meetings].sort((a, b) => {
      const dateA = new Date(a.confirmed_datetime || a.tentative_date);
      const dateB = new Date(b.confirmed_datetime || b.tentative_date);
      if (ascending) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    return sortedMeetings;
  };