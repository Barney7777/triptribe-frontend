export interface Period {
  openTime: string;

  closeTime: string;
}
export interface BusinessTime {
  isOpenAllDay: boolean;

  isClosed: boolean;
  period: Period[];
}

export type OpeningStatus = 'Closed All Day' | 'Opening All Day' | 'Opening' | 'Closed';
