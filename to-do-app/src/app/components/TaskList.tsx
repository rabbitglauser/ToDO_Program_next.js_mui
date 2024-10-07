// src/app/components/TaskList.tsx
'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { Task } from '../types'; // Import Task type

interface TaskListProps {
    tasks: Task[]; // Use Task type here
    deleteTask: (id: number) => void; // Function to delete a task
    editTask: (id: number, updatedTask: Task) => void; // Function to edit a task
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask }) => {
    const handleEdit = (task: Task) => {
        const updatedTask = {
            ...task,
            title: prompt('Edit Task Title', task.title) || task.title,
            description: prompt('Edit Task Description', task.description) || task.description,
            priority: Number(prompt('Edit Task Priority (1 or more)', task.priority.toString())) || task.priority,
        };
        editTask(task.id, updatedTask);
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <Table>
                <TableHead style={{ backgroundColor: '#00796b' }}>
                    <TableRow>
                        <TableCell style={{ color: '#ffffff' }}>Title</TableCell>
                        <TableCell style={{ color: '#ffffff' }}>Description</TableCell>
                        <TableCell style={{ color: '#ffffff' }}>Priority</TableCell>
                        <TableCell style={{ color: '#ffffff' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell style={{ borderRight: '2px solid #00796b' }}>{task.title}</TableCell>
                            <TableCell style={{ borderRight: '2px solid #00796b' }}>{task.description}</TableCell>
                            <TableCell style={{ borderRight: '2px solid #00796b' }}>{task.priority}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(task)} color="primary" style={{ marginRight: '8px' }}>
                                    Edit
                                </Button>
                                <Button onClick={() => deleteTask(task.id)} color="secondary">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;
