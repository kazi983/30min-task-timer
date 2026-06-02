import type { Task } from '../models/Task';

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onDelete }: Props) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          {task.name}

          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
