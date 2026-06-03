import { useState } from 'react';
import { TaskService } from './services/TaskService';
import TaskPickerView from './views/TaskPickerView';
import TaskManagementView from './views/TaskManagementView';
import type { Priority } from './models/Task';

const taskService = new TaskService();

function App() {
  const [screen, setScreen] = useState<'picker' | 'management'>('picker');
  const [tasks, setTasks] = useState(taskService.getIncompleteTasks());

  type NewTask = {
    name: string;
    priority: string;
    memo: string;
  };
  const addTask = (data: NewTask) => {
    taskService.addTask(data.name, data.priority as Priority, data.memo);
    setTasks(taskService.getIncompleteTasks());
  };

  type EditTask = {
    name: string;
    priority: string;
    memo: string;
  };
  const updateTask = (id: string, data: EditTask) => {
    console.log(data);
    taskService.updateTask(id, data.name, data.priority as Priority, data.memo);
    setTasks(taskService.getIncompleteTasks());
  };

  const completeTask = (id: string) => {
    taskService.completeTask(id);
    setTasks(taskService.getIncompleteTasks());
  };

  const deleteTask = (id: string) => {
    taskService.deleteTask(id);
    setTasks(taskService.getIncompleteTasks());
  };

  if (screen === 'management') {
    return (
      <TaskManagementView
        tasks={tasks}
        onBack={() => setScreen('picker')}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onCompleteTask={completeTask}
        onEditTask={updateTask}
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
