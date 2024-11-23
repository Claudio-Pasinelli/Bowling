import React, { useEffect, useState } from 'react';
import { BowlingPins, Button, InfoRound } from './ui';

function App() {
  const [pins, setPins] = useState(10); // numero di birilli in piedi
  const [roll, setRoll] = useState(1); // numero di tiri
  const [frame, setFrame] = useState(1); // numero del frame
  const [frameScore, setFrameScore] = useState(0); // punteggio totale di un frame

  const [totalScore, setTotalScore] = useState<number>(0); // score/punteggio globale
  const [totalScores, setTotalScores] = useState<number[]>([]); // array che contiene i punteggi di ogni frame
  const [rollScores, setRollScores] = useState<string[]>([]); // array di stringhe che serve per mostrare i punteggi dei singoli roll di un frame (ES: Frame 1: 4 | 5)
  const [standingPins, setStandingPins] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // array di numeri che contiene i birilli che sono in piedi

  const [strike, setStrike] = useState(false); // variabile che indica uno stato, quello per lo strike
  const [spare, setSpare] = useState(false); // variabile che indica uno stato, quello per lo spare

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // variabile che serve per disabilitare il bottone Roll una volta finiti tutti i tiri e i frame

  // porta al giocatore al prossimo frame tranne nel caso in cui è già al decimo
  // se al decimo non ho fatto né strike né spare blocco il bottone
  const handleReset = () => {
    if (frame < 10) {
      setFrame((prevFrame) => prevFrame + 1);
      setRoll(1);
      setPins(10);

      setTimeout(() => {
        setStandingPins([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      }, 1500);
    } else if (frame === 10 && roll === 2 && !strike && !spare) {
      setIsButtonDisabled(true);
    }
  };

  // metodo che calcola
  const handleTotalScore = () => {
    let value = 0;

    for (let i = 0; i < totalScores.length; i++) {
      value += totalScores[i];
    }

    setTotalScore(value);
  };

  const handleRoll = () => {
    const randomNumber = Math.floor(Math.random() * (pins + 1)); // Genera un numero casuale tra 0 e i birilli rimasti

    setStandingPins((prevKnockedPins) => {
      const remainingPins = [...prevKnockedPins];
      for (let i = 0; i < randomNumber; i++) {
        const index = Math.floor(Math.random() * remainingPins.length); // Seleziona un birillo casuale
        remainingPins.splice(index, 1); // Rimuovilo dall'array
      }
      return remainingPins;
    });

    if (roll === 1) {
      if (spare) {
        // Bonus per spare precedente
        setTotalScores((prevTS) => {
          const updatedTS = [...prevTS];
          updatedTS[updatedTS.length - 1] += randomNumber;
          return updatedTS;
        });
      }

      if (randomNumber === 10) {
        // Strike
        setTotalScores((prevTS) => {
          const updatedTS = [...prevTS];

          // Aggiungi bonus per strike precedente
          if (strike) {
            updatedTS[updatedTS.length - 1] += 10 + randomNumber; // Somma lo strike con il tiro attuale
          }

          updatedTS.push(10); // Aggiungi lo strike per il frame corrente
          return updatedTS;
        });

        setRollScores((prevRS) => [...prevRS, 'X']); // Registra lo strike
        setStrike(true); // Stato di strike attivo
        setSpare(false); // Disattiva spare

        if (frame < 10) {
          handleReset();
        } else {
          setRoll(2);
          setPins(10); // Reset per il secondo tiro del decimo frame
        }
      } else {
        // Primo tiro normale
        setPins(10 - randomNumber);
        setRoll(2);
        setFrameScore(randomNumber);

        setTotalScores((prevTS) => [...prevTS, randomNumber]);
        setRollScores((prevRS) => [...prevRS, randomNumber.toString()]);
      }
    } else if (roll === 2) {
      const totalForFrame = randomNumber + frameScore;

      if (totalForFrame === 10) {
        // Spare
        setSpare(true);
        setStrike(false);

        if (frame < 10) {
          setTotalScores((prevTS) => {
            const updatedTS = [...prevTS];
            updatedTS[updatedTS.length - 1] = 10; // Spare vale 10
            return updatedTS;
          });

          setRollScores((prevRS) => {
            const updatedRS = [...prevRS];
            updatedRS[updatedRS.length - 1] = `${frameScore} | /`;
            return updatedRS;
          });

          handleReset();
        } else {
          // Spare nel decimo frame
          setRollScores((prevRS) => {
            const updatedRS = [...prevRS];
            updatedRS[updatedRS.length - 1] = `${frameScore} | /`;
            return updatedRS;
          });

          setRoll(3); // Tiro bonus
          setPins(10); // Reset per il tiro bonus
        }
      } else {
        // Open frame o secondo tiro
        setRollScores((prevRS) => {
          const updatedRS = [...prevRS];
          updatedRS[updatedRS.length - 1] = `${frameScore} | ${randomNumber}`;
          return updatedRS;
        });

        if (frame === 10) {
          setIsButtonDisabled(true); // Fine partita
        } else {
          handleReset();
        }

        setSpare(false);
      }

      if (strike) {
        setTotalScores((prevTS) => {
          const updatedTS = [...prevTS];

          updatedTS[updatedTS.length - 1] += randomNumber;

          // Bonus per strike precedente

          updatedTS[updatedTS.length - 2] += randomNumber + frameScore; // Somma i due tiri al frame precedente
          setStrike(false);

          return updatedTS;
        });
      }
    } else if (roll === 3) {
      // Tiro bonus nel decimo frame
      setTotalScores((prevTS) => {
        const updatedTS = [...prevTS];
        updatedTS[updatedTS.length - 1] += randomNumber;
        return updatedTS;
      });

      setRollScores((prevRS) => {
        const updatedRS = [...prevRS];
        updatedRS[updatedRS.length - 1] += ` | ${randomNumber}`; // Aggiungi tiro bonus
        return updatedRS;
      });

      setIsButtonDisabled(true); // Disabilita il bottone
    }
  };

  // lo useEffect osserva i cambiamenti dell'array totalScores e, ad ogni modifica, calcola lo score/punteggio globale che verrà mostrato nell'<h1> sottostante
  useEffect(() => {
    handleTotalScore();
  }, [totalScores]);

  return (
    <div className="flex size-full items-center justify-around">
      <div>
        <h1 className="mb-4">Punteggio Totale: {totalScore}</h1>

        <Button
          text="Roll"
          title="Roll the ball"
          backgroundColor="bg-gray-300"
          textColor="text-black"
          disabled={isButtonDisabled}
          onClick={handleRoll}
        />
      </div>

      <div className="flex size-1/4 flex-col border-x-2 border-t-2 border-black">
        <BowlingPins standingPins={standingPins} />
        <div className="flex size-full items-end justify-center">
          <div
            className="size-8 cursor-pointer rounded-full bg-lightblue-100"
            title="Roll the Ball"
            onClick={handleRoll}></div>
        </div>
      </div>

      <InfoRound frames={totalScores} rollScores={rollScores} />
    </div>
  );
}

export default App;
