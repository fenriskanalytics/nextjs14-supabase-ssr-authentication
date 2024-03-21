import { CombinedMeetingType } from "@/types/combinedMeetings";

export const filterMeetingsByDays = (meetings: CombinedMeetingType[], days: number) => {
  const currentDate = new Date().getTime(); // Get current date in milliseconds
  const filteredMeetings = meetings.filter((meeting) => {
    const meetingDate = meeting.confirmed_datetime || meeting.tentative_date;
    if (!meetingDate) return false; // Skip if meetingDate is null
    const dateValue = new Date(meetingDate).getTime(); // Get time in milliseconds
    const timeDifference = currentDate - dateValue; // Calculate time difference
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysDifference <= days;
  });
  return filteredMeetings;
};

export const sortMeetingsByDate = (meetings: CombinedMeetingType[], ascending: boolean) => {
  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = a.confirmed_datetime ? new Date(a.confirmed_datetime).getTime() : (a.tentative_date ? new Date(a.tentative_date).getTime() : 0);
    const dateB = b.confirmed_datetime ? new Date(b.confirmed_datetime).getTime() : (b.tentative_date ? new Date(b.tentative_date).getTime() : 0);
    if (ascending) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  return sortedMeetings;
};

// Define Meeting type outside of the function
type Meeting = {
  household_name: string;
  confirmed_datetime: Date | null;
  tentative_date: Date | null;
  meeting_location: string;
  meetings_status: string;
  primary_agenda_topic: string;
};
