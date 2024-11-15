/* eslint-disable quotes */
import React, { useState } from 'react';
import { Button, GameInfo, Tooltip } from './ui/atoms';
import BowlingPins from './ui/atoms/BowlingPins';

function App() {
  const [frame, setFrame] = useState(1);
  const [roll, setRoll] = useState(1);
  const [rollScore, setRollScore] = useState(0);
  const [frameScore, setFrameScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [strikes, setStrikes] = useState(0);
  const [spares, setSpares] = useState(0);

  const [showTooltip, setShowTooltip] = useState(false);

  const [standingPins, setStandingPins] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const gameInfo = [
    { name: 'Frame', quantity: frame },
    { name: 'Roll', quantity: roll },
    { name: 'Roll Score', quantity: rollScore },
    { name: 'Frame Score', quantity: frameScore },
    { name: 'Total Score', quantity: totalScore },
    { name: 'Strikes', quantity: strikes },
    { name: 'Spares', quantity: spares },
  ];

  const handleRoll = () => {
    // genero un numero casuale (che arrotondo a intero) che va da 0 a alla lunghezza dell'array standingPins (birilli in piedi)
    const numberOfKnockedPins = Math.floor(Math.random() * (standingPins.length + 1)); // es: se standingPins.length è 10 il numero sarà tra 0 e 11 (escluso)
    const knockedPins: number[] = [];

    // ciclo che continua a generare dei numeri unici, casuali e interi che vengono messi nell'array knockedPins
    while (knockedPins.length < numberOfKnockedPins) {
      // ottengo un birillo casuale così: arrotondo per intero un numero casuale che va da 0 a 1 moltiplicato per la lunghezza dell'array standingPins,
      // questo rappresenterà un indice, un indice casuale che rappresenta un birillo in standingPins
      const randomPin = standingPins[Math.floor(Math.random() * standingPins.length)];
      if (!knockedPins.includes(randomPin)) {
        // se l'array knockedPins non contiene il nuovo numero casuale lo deve avere
        knockedPins.push(randomPin);
      }
    }

    setRollScore(numberOfKnockedPins);

    setFrameScore((prevFrameScore) => prevFrameScore + numberOfKnockedPins);

    setTotalScore((prevTotalScore) => prevTotalScore + numberOfKnockedPins);

    // modifico l'array standingPins filtrandolo: vado a rimuovergli tutti i birilli contenuti in knockedPins (scelti a caso con il ciclo while)
    setStandingPins((prev) => prev.filter((pin) => !knockedPins.includes(pin)));
    setShowTooltip(true);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 p-4 pt-14">
      {showTooltip && (
        <Tooltip
          message={
            rollScore === 0
              ? `You didn't knock down any pin!`
              : rollScore === 10
                ? 'Strike!'
                : rollScore === 1
                  ? `You knocked down ${rollScore} pins!`
                  : `You knocked down ${rollScore} pin!`
          }
          error={rollScore === 0}
          onClose={() => setShowTooltip(false)}
        />
      )}
      <div className="flex h-full w-full max-w-lg flex-col items-center justify-between">
        <GameInfo data={gameInfo} />
        <div className="relative flex h-96 w-full border-x-2 border-t-2 border-black">
          <div className="absolute left-0 top-0 flex h-1/2 w-full items-center justify-center">
            <BowlingPins standingPins={standingPins} />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="h-10 w-10 rounded-full bg-lightblue-50 shadow-md"></div>
          </div>
        </div>

        <div className="mt-4">
          <Button
            text="Roll"
            title="Roll the ball"
            backgroundColor="bg-gray-200"
            textColor="black"
            onClick={handleRoll}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
