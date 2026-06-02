type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function TaskInput({ value, onChange, onAdd }: Props) {
  return (
    <>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      <button onClick={onAdd}>Add</button>
    </>
  );
}
