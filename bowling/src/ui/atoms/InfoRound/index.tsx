interface Props {
  frames: number[];
  rollScores: string[];
}

const InfoRound = ({ frames, rollScores }: Props) => {
  return (
    <div>
      {frames.map((frameScore, index) => {
        const rolls = rollScores[index].split(' | ');

        return (
          <div key={index} className="mb-4">
            <p>
              Frame {index + 1}: {rolls[0]} {rolls[1] ? `| ${rolls[1]}` : ''}
            </p>
            <p>Punteggio Frame: {frameScore}</p>
          </div>
        );
      })}
    </div>
  );
};

export default InfoRound;
