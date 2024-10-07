// src/app/types.ts
export interface Task {
    id: number;         // Unique identifier for each task
    title: string;      // Title of the task
    description: string; // Description of the task
    priority: number;    // Priority level of the task (1 for low, 2 for medium, etc.)
}
