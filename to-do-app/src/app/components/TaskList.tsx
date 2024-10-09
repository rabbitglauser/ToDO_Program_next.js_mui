'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { Task } from '../types'; // Import Task type

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
 * @returns A React functional component that renders the Task List with task details and actions.
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask }) => {
    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<number | ''>(1); // Default priority

    // Keeping the original handleEdit structure
    const handleEdit = (task: Task) => {
        try {
            // Open dialog and set current task details
            setCurrentTask(task);
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setOpen(true);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentTask(null);
        setTitle('');
        setDescription('');
        setPriority(1); // Reset to default
    };

    const handleSave = () => {
        if (currentTask) {
            const updatedTask = {
                ...currentTask,
                title,
                description,
                priority: Number(priority),
            };

            try {
                editTask(currentTask.id, updatedTask);
                handleClose();
            } catch (error) {
                console.error('Error saving task:', error);
            }
        }
    };

    const getPriorityColor = (priority: number) => {
        if (priority >= 4) return '#d32f2f'; // High priority
        if (priority === 3) return '#f57c00'; // Medium priority
        if (priority === 2) return '#1976d2'; // Low priority
        return '#388e3c'; // Default priority
    };

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#00796b' }}>
                        <TableRow>
                            <TableCell style={{ color: '#ffffff' }}>Title</TableCell>
                            <TableCell style={{ color: '#ffffff' }}>Description</TableCell>
                            <TableCell style={{ color: '#ffffff' }}>Priority</TableCell>
                            <TableCell style={{ color: '#ffffff' }}>Time</TableCell>
                            <TableCell style={{ color: '#ffffff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell style={{ borderRight: '2px solid #00796b' }}>{task.title}</TableCell>
                                <TableCell style={{ borderRight: '2px solid #00796b' }}>{task.description}</TableCell>
                                <TableCell style={{ borderRight: '2px solid #00796b', color: getPriorityColor(task.priority) }}>
                                    {task.priority}
                                </TableCell>
                                <TableCell style={{ borderRight: '2px solid #00796b' }}>{new Date(task.id).toLocaleString()}</TableCell>
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

            {/* Dialog for editing a task */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit-title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="edit-description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="edit-priority"
                        label="Priority"
                        type="number"
                        fullWidth
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskList;

