
export interface TaskStatusItem {
  key: string;
  id: number;
  taskDefinition: string;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export const taskStatusData: TaskStatusItem[] = [
  {
    key: "1",
    id: 98,
    taskDefinition: "TRIGGER - EXP",
    status: "Completed",
    createdAt: "May 29, 2025, 11:05 a.m.",
    createdBy: "super",
    updatedAt: "May 29, 2025, 11:06 a.m.",
  },
  {
    key: "2",
    id: 97,
    taskDefinition: "TRIGGER - TU",
    status: "Completed with errors",
    createdAt: "May 5, 2025, 8:08 a.m.",
    createdBy: "admin",
    updatedAt: "May 5, 2025, 8:37 a.m.",
  },
];
