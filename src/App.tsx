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
  const handleAddTask = (data: NewTask) => {
    taskService.addTask(data.name, data.priority as Priority, data.memo);
    setTasks(taskService.getIncompleteTasks());
  };

  type EditTask = {
    id: string;
    name: string;
    priority: string;
    memo: string;
  };
  const handleEditTask = (data: EditTask) => {
    console.log(data);
    taskService.editTask(data.id, data.name, data.priority as Priority, data.memo);
    setTasks(taskService.getIncompleteTasks());
  };

  type CompleteTask = {
    id: string;
  };
  const handleCompleteTask = (data: CompleteTask) => {
    taskService.markTaskAsComplete(data.id);
    setTasks(taskService.getIncompleteTasks());
  };

  type DeleteTask = {
    id: string;
  };
  const handleDeleteTask = (data: DeleteTask) => {
    taskService.markTaskAsDelete(data.id);
    setTasks(taskService.getIncompleteTasks());
  };

  if (screen === 'management') {
    return (
      <TaskManagementView
        tasks={tasks}
        onBack={() => setScreen('picker')}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onCompleteTask={handleCompleteTask}
        onEditTask={handleEditTask}
      />
    );
  }
  return (
    <TaskPickerView
      tasks={tasks}
      onAddTask={handleAddTask}
      onStartTask={() => {}}
      onSnooze={() => {}}
      onOpenManagement={() => setScreen('management')}
    />
  );
}

export default App;
