// src/utils/fetchCombinedMeetings.ts

import { supabase } from "@/app/api/supabaseClient";
// Ensure the import path matches where you've defined your CombinedMeetingType
import { CombinedMeetingType } from "@/types/combinedMeetings";

// Correct the return type to Promise<CombinedMeetingType[]> instead of Promise<CombinedMeetingTypes[]>
export async function fetchCombinedMeetings(): Promise<CombinedMeetingType[]> {
  const { data: combinedMeetings, error } = await supabase
    .from("combined_meeting_tables") // Use the generic type parameter for type safety
    .select("*");

  if (error) {
    console.error(error);
    // It's a good practice to throw an error here, but make sure you handle it in the component that calls this function.
    throw new Error('Failed to fetch combined meetings');
  }

  // Return combinedMeetings directly; the "|| []" is not necessary due to the error handling above
  return combinedMeetings;
}

