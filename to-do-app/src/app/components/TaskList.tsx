// src/app/components/TaskList.tsx
'use client';

import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper} from '@mui/material';
import {Task} from '../types'; // Import Task type

/**
 * Represents the properties needed for the TaskList component.
 * @interface
 */
interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    editTask: (id: number, updatedTask: Task) => void;
}

/**
 * Represents a Task List component that displays a list of tasks along with functionalities to edit and delete tasks.
 * @param tasks - An array of tasks to be displayed in the list.
 * @param deleteTask - A function to delete a specific task.
 * @param editTask - A function to edit a specific task.
 * @returns A React functional component that renders the Task List with task details and actions.
 */
const TaskList: React.FC<TaskListProps> = ({tasks, deleteTask, editTask}) => {
    const handleEdit = (task: Task) => {
        const updatedTask = {
            ...task,
            title: prompt('Edit Task Title', task.title) || task.title,
            description: prompt('Edit Task Description', task.description) || task.description,
            priority: Number(prompt('Edit Task Priority (1 or more)', task.priority.toString())) || task.priority,
        };
        editTask(task.id, updatedTask);
    };

    const getPriorityColor = (priority: number) => {
        if (priority >= 4) return '#d32f2f'; // High priority - Red
        if (priority === 3) return '#f57c00'; // Medium priority - Orange
        if (priority === 2) return '#1976d2'; // Low priority - Blue
        return '#388e3c'; // Very low priority - Green
    };

    return (
        <TableContainer component={Paper} style={{marginTop: '20px', borderRadius: '8px', backgroundColor: '#ffffff'}}>
            <Table>
                <TableHead style={{backgroundColor: '#00796b'}}>
                    <TableRow>
                        <TableCell style={{color: '#ffffff'}}>Title</TableCell>
                        <TableCell style={{color: '#ffffff'}}>Description</TableCell>
                        <TableCell style={{color: '#ffffff'}}>Priority</TableCell>
                        <TableCell style={{color: '#ffffff'}}>Time</TableCell>
                        <TableCell style={{color: '#ffffff'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell style={{borderRight: '2px solid #00796b'}}>{task.title}</TableCell>
                            <TableCell style={{borderRight: '2px solid #00796b'}}>{task.description}</TableCell>
                            <TableCell
                                style={{borderRight: '2px solid #00796b', color: getPriorityColor(task.priority)}}>
                                {task.priority}
                            </TableCell>
                            <TableCell
                                style={{borderRight: '2px solid #00796b'}}>{new Date(task.id).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(task)} color="primary" style={{marginRight: '8px'}}>
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
