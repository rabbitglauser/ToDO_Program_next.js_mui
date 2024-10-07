// app/page.tsx
'use client';

import { useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import TaskForm from '../app/TaskForm';
import TaskList from '../app/TaskList';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            ToDo App
          </Typography>
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
        </Paper>
      </Container>
  );
};

export default Home;
