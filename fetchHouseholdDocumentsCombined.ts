// utils/fetchHouseholdDocumentsCombined.ts
import { supabase } from "@/lib/supabase/supabaseClient";
import { HouseholdDocumentsCombined } from "../types/householdDocumentsCombined";

export async function fetchHouseholdDocumentsCombined(): Promise<
  HouseholdDocumentsCombined[]
> {
  try {
    const { data, error }: { data: HouseholdDocumentsCombined[] | null; error: any } = await supabase
      .from("household_documents_combined")
      .select("*");

    if (error) {
      throw error;
    }

    if (!data) {
      console.error("No data received when fetching household documents combined.");
      return [];
    }

    // Map the fetched data to the HouseholdDocumentsCombined type
    const documents: HouseholdDocumentsCombined[] = data.map((item) => ({
      hh_docs_id: item.hh_docs_id,
      document_id: item.document_id,
      hh_id: item.hh_id,
      related_to: item.related_to,
      last_document_date: item.last_document_date || null,
      request_frequency: item.request_frequency,
      status: item.status || null,
      tied_to: item.tied_to || null,
      doc_version_id: item.doc_version_id,
      document_name: item.document_name,
      document_date: item.document_date,
      current_version: item.current_version,
      document_received: item.document_received,
      doc_url: item.doc_url || null,
      created_at: item.created_at,
      document: item.document,
      document_type: item.document_type,
      document_subtype: item.document_subtype || null,
    }));

    return documents;
  } catch (error: any) {
    console.error(
      "Error fetching household documents combined:",
      error.message,
    );
    return [];
  }
}
