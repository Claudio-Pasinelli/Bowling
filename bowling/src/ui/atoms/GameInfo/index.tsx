interface Props {
  data: { name: string; quantity: number }[];
}

const GameInfo = ({ data }: Props) => {
  return (
    <ul className="mb-4 size-auto justify-self-center">
      {data.map((item) => (
        <li key={item.name} className="text-xs">
          {item.name}: {item.quantity}
        </li>
      ))}
    </ul>
  );
};

export default GameInfo;
