// src/app/components/TaskForm.tsx
'use client';

import React, {useState} from 'react';
import {Button, TextField, Grid, Snackbar, Alert} from '@mui/material';
import {Task} from '../types'; // Import Task type

/**
 * Represents the properties expected by the TaskForm component.
 */
interface TaskFormProps {
    addTask: (task: Task) => void; // Use Task type here
}

/**
 * Represents a form component for creating a new task.
 * The TaskForm component allows users to input task details including title, description, and priority, and submit the task for addition to a task list.
 * It provides functionality to validate input, display error messages, and adjust priority color based on user selection.
 * Users can add a new task by filling out the form and submitting it.
 * The form includes fields for task title, description, and priority level.
 * If the title is empty or priority is outside the range of 0 to 10, an error message is displayed.
 * The priority color changes based on the selected priority level.
 */
const TaskForm: React.FC<TaskFormProps> = ({addTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // look at this
        setError('');
        if (!title.trim() || priority < 0 || priority > 10) {
            setError('Title is required and priority must be between 0 and 10.');
            setOpenSnackbar(true);
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            priority,
        };
        addTask(newTask);
        setTitle('');
        setDescription('');
        setPriority(1);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const getPriorityColor = (priority: number): string => {
        if (priority <= 3) return 'green';
        if (priority <= 6) return 'orange';
        return 'red';
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        error={!!error}
                        style={{
                            backgroundColor: '#e0f7fa',
                            borderRadius: '5px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#0097a7',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        style={{
                            backgroundColor: '#e0f7fa',
                            borderRadius: '5px',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Priority"
                        type="number"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        required
                        fullWidth
                        inputProps={{min: 0, max: 10}}
                        style={{
                            backgroundColor: '#e0f7fa',
                            borderRadius: '5px',
                        }}
                        InputProps={{
                            style: {
                                color: getPriorityColor(priority),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                            backgroundColor: '#00796b',
                            color: '#ffffff',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: '#004d40',
                            },
                        }}
                    >
                        Add Task
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default TaskForm;
