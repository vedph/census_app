/**
 * A page of data.
 */
export interface DataPage<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: T[];
}

/**
 * Filter for acts.
 */
export interface ActFilter {
  pageNumber: number;
  pageSize: number;
  archiveId?: number;
  bookId?: number;
  bookYearMin?: number;
  bookYearMax?: number;
  description?: string;
  actTypeId?: number;
  familyId?: number;
  companyId?: number;
  placeId?: number;
  label?: string;
  categoryIds?: number[];
  professionIds?: number[];
  partnerIds?: number[];
}

/**
 * Information about an act.
 */
export interface ActInfo {
  id: number;
  typeId: number;
  typeName: string;
  subtypeId: number;
  subtypeName: string;
  familyId: number;
  familyName: string;
  companyId: number;
  companyName: string;
  placeId: number;
  placeName: string;
  label: string;
  archiveId: number;
  archiveName: string;
  bookId: number;
  bookLocation: string;
  bookDescription: string;
  bookStartYear: number;
  bookEndYear: number;
  bookFile: string;
}

export interface LookupItem {
  id: number;
  name: string;
}

export enum DataEntityType
{
    act = 0,
    actType,
    actSubtype,
    archive,
    book,
    bookType,
    bookSubtype,
    category,
    company,
    family,
    person,
    place,
    profession
}
