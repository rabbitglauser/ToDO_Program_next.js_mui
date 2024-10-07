// components/TaskForm.tsx
'use client';

import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

interface TaskFormProps {
    addTask: (task: { id: number; title: string; description: string; priority: number }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1); // Default priority
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim() || priority <= 0) {
            setError('Title is required and priority must be greater than zero.');
            return;
        }

        const newTask = {
            id: Date.now(), // Unique ID for the task
            title,
            description,
            priority,
        };
        addTask(newTask);
        setTitle('');
        setDescription('');
        setPriority(1);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        error={!!error}
                        helperText={error}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
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
                        inputProps={{ min: 1 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskForm;
