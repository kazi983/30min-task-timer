import { useState } from 'react';
import { TaskService } from './services/TaskService';
import TaskPickerView from './views/TaskPickerView';
import TaskManagementView from './views/TaskManagementView';
import type { AddTaskInput, UpdateTaskInput } from './models/Task';

const taskService = new TaskService();

function App() {
  const refreshTasks = () => taskService.getTasks({ deleted: false, completed: false });

  const [screen, setScreen] = useState<'picker' | 'management'>('picker');
  const [tasks, setTasks] = useState(refreshTasks());

  const addTask = (data: AddTaskInput) => {
    taskService.addTask(data);
    setTasks(refreshTasks());
  };

  const updateTask = (id: string, data: UpdateTaskInput) => {
    taskService.updateTask(id, data);
    setTasks(refreshTasks());
  };

  const completeTask = (id: string) => {
    taskService.completeTask(id);
    setTasks(refreshTasks());
  };

  const deleteTask = (id: string) => {
    taskService.deleteTask(id);
    setTasks(refreshTasks());
  };

  if (screen === 'management') {
    return (
      <TaskManagementView
        tasks={tasks}
        onBack={() => setScreen('picker')}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onCompleteTask={completeTask}
        onUpdateTask={updateTask}
      />
    );
  }
  return (
    <TaskPickerView
      tasks={tasks}
      onAddTask={addTask}
      onStartTask={() => {}}
      onSnooze={() => {}}
      onOpenManagement={() => setScreen('management')}
    />
  );
}

export default App;
