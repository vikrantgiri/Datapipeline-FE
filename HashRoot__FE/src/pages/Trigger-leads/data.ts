export interface TriggerLeadItem {
  key: string;
  id: number;
  firstName: string;
  lastName: string;
  state: string;
  zip: string;
  dataSource: string;
  leadType: string;
  createdAt: string;
}

export const triggerLeadsData: TriggerLeadItem[] = [
  {
    key: "1",
    id: 680,
    firstName: "MICHAEL",
    lastName: "BROWN",
    state: "MI",
    zip: "48820",
    dataSource: "Experian",
    leadType: "HECM to HECM",
    createdAt: "June 4, 2025, 2:13 a.m.",
  },
  {
    key: "2",
    id: 679,
    firstName: "TATIANA",
    lastName: "SUAREZ",
    state: "CO",
    zip: "80542",
    dataSource: "TransUnion",
    leadType: "First Time Reverse",
    createdAt: "June 4, 2025, 2:13 a.m.",
  },
];
