export function UserCard({ reaction }) {
  return (
    <div>
      <p>{reaction.emoji}</p>
      <p>{reaction.count}</p>
      <button onClick={handleAdd}>+</button>
    </div>
  );
}
