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

export interface Book {
  id: number;
  archive: LookupItem;
  type: LookupItem;
  subtype: LookupItem;
  writePlace?: LookupItem;
  writer?: LookupItem;
  location: string;
  description?: string;
  incipit?: string;
  startYear?: number;
  endYear?: number;
  edition?: string;
  note?: string;
  file?: string;
}

export interface Act {
  id: number;
  book: Book;
  type: LookupItem;
  subtype: LookupItem;
  company?: LookupItem;
  family?: LookupItem;
  place?: LookupItem;
  label: string;
  note?: string;
  categories?: LookupItem[];
  professions?: LookupItem[];
  partners?: LookupItem[];
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
    profession,
    // virtual
    partner
}
