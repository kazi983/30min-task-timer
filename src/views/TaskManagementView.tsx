import { useState } from 'react';
import type { Task } from '../models/Task';

type Props = {
  tasks: Task[];

  onAddTask: (data: { name: string; priority: string; memo: string }) => void;

  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (
    id: string,
    data: {
      name: string;
      priority: string;
      memo: string;
    },
  ) => void;

  onBack: () => void;
};

export default function TaskManagementView({
  tasks,
  onAddTask: onAddTask,
  onCompleteTask: onCompleteTask,
  onDeleteTask: onDeleteTask,
  onEditTask: onEditTask,
  onBack,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [priority, setPriority] = useState('NOW');
  const [memo, setMemo] = useState('');

  const selectedTask = tasks.find((t) => t.id === selectedId);

  const handleSelect = (task: Task) => {
    setSelectedId(task.id);
    setName(task.name);
    setPriority(task.priority);
    setMemo(task.memo);
  };

  const handleAddButtonClick = () => {
    if (!name.trim()) return;

    onAddTask({
      name,
      priority,
      memo,
    });

    setName('');
    setMemo('');
    setPriority('NOW');
  };

  const handleUpdateButtonClick = () => {
    if (!selectedTask) return;

    onEditTask(selectedTask.id, {
      name,
      priority,
      memo,
    });
  };

  return (
    <div
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h2>タスク管理</h2>

      {/* TABLE */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          maxHeight: 300,
          overflow: 'auto',
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleSelect(task)}
            style={{
              padding: 8,
              cursor: 'pointer',
              background: selectedId === task.id ? '#dbeafe' : 'white',
              borderBottom: '1px solid #eee',
            }}
          >
            {task.completed ? '✓ ' : ''}
            {task.name} / {task.priority}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="task name"
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="NOW">NOW</option>
          <option value="SOONER">SOONER</option>
          <option value="ANYTIME">ANYTIME</option>
          <option value="SOMEDAY">SOMEDAY</option>
        </select>

        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="memo"
        />
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: 'flex',
          gap: 8,
        }}
      >
        <button onClick={handleAddButtonClick}>＋ 新規登録</button>

        <button onClick={() => selectedTask && onCompleteTask(selectedTask.id)}>
          完了
        </button>

        <button onClick={() => selectedTask && onDeleteTask(selectedTask.id)}>
          削除
        </button>

        <button onClick={handleUpdateButtonClick}>更新</button>

        <button onClick={onBack}>戻る</button>
      </div>
    </div>
  );
}
