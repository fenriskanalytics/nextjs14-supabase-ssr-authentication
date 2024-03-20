// src/utils/fetchCombinedMeetings.ts
import { supabase } from "@/lib/supabase/supabaseClient";
import { CombinedMeeting } from "../types/combinedMeeting";

export async function fetchCombinedMeetings(): Promise<CombinedMeeting[]> {
  let { data: combinedMeetings, error } = await supabase
    .from('combined_meeting_tables')
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return combinedMeetings || [];
}

