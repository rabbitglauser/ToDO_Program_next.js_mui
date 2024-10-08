// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import TaskForm from './components/TaskForm'; // Adjust path as necessary
import TaskList from './components/TaskList'; // Adjust path as necessary
import { Task } from './types';
import {id} from "postcss-selector-parser"; // Adjust the import path as necessary

/**
 * Represents a functional component for a ToDo list application home page.
 *
 * This component manages the state of tasks, allowing users to add, delete, and edit tasks.
 *
 * @returns {ReactElement} The JSX for the home page containing the ToDo application interface.
 */
const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Use Task type here

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
    );
  };

  return (
      <Container maxWidth="md" style={{ marginTop: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#00796b' }}>
            ToDo App
          </Typography>
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask}/>
        </Paper>
      </Container>
  );
};

export default Home;
