import { useState } from 'react';
import type { Task } from '../models/Task';

type Props = {
  tasks: Task[];
  onAddTask: (data: { name: string; priority: string; memo: string }) => void;
  onStartTask: (task: Task) => void;
  onSnooze: () => void;
  onOpenManagement: () => void;
};

export default function TaskPickerView({
  tasks,
  onAddTask,
  onStartTask,
  onSnooze,
  onOpenManagement,
}: Props) {
  const [input, setInput] = useState('');

  const lastSelectedTask = tasks.find((task) => task.lastSelected);

  const [selectedTaskId, setSelectedTaskId] = useState(
    lastSelectedTask?.id ?? tasks[0]?.id,
  );

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const handleAddTask = () => {
    const name = input.trim();

    if (!name) {
      return;
    }

    onAddTask({
      name,
      priority: 'NOW',
      memo: '',
    });

    setInput('');
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'NOW':
        return '🔥';
      case 'SOONER':
        return '⭐';
      case 'ANYTIME':
        return '📝';
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        width: 500,
        margin: '0 auto',
        padding: 32,
      }}
    >
      <h1>今から何をやる？</h1>

      {lastSelectedTask && <p>前回の続き: {lastSelectedTask.name}</p>}

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          placeholder="タスクを入力"
        />

        <button onClick={handleAddTask}>+ 追加</button>
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            onDoubleClick={() => onStartTask(task)}
            style={{
              padding: 12,
              marginBottom: 4,
              cursor: 'pointer',
              border:
                selectedTaskId === task.id ? '2px solid #4d8eff' : '1px solid #ddd',
            }}
          >
            {getPriorityIcon(task.priority)} {task.name}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <button
          disabled={!selectedTask}
          onClick={() => {
            if (selectedTask) {
              onStartTask(selectedTask);
            }
          }}
        >
          ▶ はじめる
        </button>

        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          <button onClick={onSnooze}>あとで</button>

          <button onClick={onOpenManagement}>編集</button>
        </div>
      </div>
    </div>
  );
}
