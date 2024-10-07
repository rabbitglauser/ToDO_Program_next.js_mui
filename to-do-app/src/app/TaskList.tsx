// components/TaskList.tsx
'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '@mui/material';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: number;
}

interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    editTask: (id: number, updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask }) => {
    const actionTemplate = (rowData: Task) => {
        return (
            <div>
                <Button onClick={() => deleteTask(rowData.id)} color="secondary" variant="outlined">
                    Delete
                </Button>
                {/* You can implement edit functionality here */}
            </div>
        );
    };

    return (
        <div>
            <DataTable value={tasks} paginator rows={5} header="Task List" style={{ marginTop: '20px' }}>
                <Column field="title" header="Title" sortable />
                <Column field="description" header="Description" sortable />
                <Column field="priority" header="Priority" sortable />
                <Column body={actionTemplate} header="Actions" />
            </DataTable>
        </div>
    );
};

export default TaskList;
