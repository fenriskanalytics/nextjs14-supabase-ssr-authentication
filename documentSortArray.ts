import { HouseholdDocumentsCombined } from "../types/householdDocumentsCombined";

export function documentSortArray(
  documents: HouseholdDocumentsCombined[],
): HouseholdDocumentsCombined[][] {
  const documentGroups: { [documentId: number]: HouseholdDocumentsCombined[] } =
    {};

  documents.forEach((doc) => {
    if (!documentGroups[doc.document_id]) {
      documentGroups[doc.document_id] = [];
    }
    documentGroups[doc.document_id].push(doc);
  });

  const documentArrays: HouseholdDocumentsCombined[][] =
    Object.values(documentGroups);

  documentArrays.forEach((docs) => {
    docs.sort((a, b) => {
      const dateA = new Date(a.document_date).getTime();
      const dateB = new Date(b.document_date).getTime();
      return dateB - dateA;
    });
  });

  documentArrays.sort((a, b) => {
    const dateA = new Date(a[0].document_date).getTime();
    const dateB = new Date(b[0].document_date).getTime();
    return dateB - dateA;
  });

  return documentArrays;
}
