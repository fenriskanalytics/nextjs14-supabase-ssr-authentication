// src/utils/fetchCombinedMeetings.ts

import { supabase } from "@/lib/supabase/supabaseClient";
import { CombinedMeeting } from "../types/combinedMeeting";
import { NextApiRequest } from "next";

export async function fetchCombinedMeetings(req?: NextApiRequest): Promise<CombinedMeeting[]> {
  if (req) {
    // Fetching data on the server-side
    const { data, error } = await supabase
      .from("combined_meeting_tables")
      .select("*");

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } else {
    // Fetching data on the client-side
    let { data: combinedMeetings, error } = await supabase
      .from("combined_meeting_tables")
      .select("*");

    if (error) {
      console.error(error);
      return [];
    }

    return combinedMeetings || [];
  }
}
