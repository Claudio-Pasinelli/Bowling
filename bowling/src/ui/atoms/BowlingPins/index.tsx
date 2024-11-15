interface BowlingPinsProps {
  standingPins: number[]; // Array contenente i numeri dei birilli ancora in piedi
}

const BowlingPins = ({ standingPins }: BowlingPinsProps) => {
  // Configurazione delle righe di birilli nella loro disposizione a piramide
  const pinRows = [[7, 8, 9, 10], [4, 5, 6], [2, 3], [1]];

  return (
    <div className="relative flex flex-col items-center space-y-2">
      {/* Itera attraverso ogni riga di birilli */}
      {pinRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-4">
          {/* Itera attraverso ogni birillo in una riga */}
          {row.map((pin) => (
            <div
              key={pin}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-4 ${
                // Se il birillo è presente nell'array `standingPins` (birilli ancora in piedi),
                // applica un bordo nero e uno sfondo bianco. Altrimenti, usa un bordo e uno sfondo grigio.
                standingPins.includes(pin) ? 'border-black bg-white' : 'border-gray-500 bg-gray-300'
              }`}>
              {/* Mostra il numero del birillo solo se è ancora in piedi (presente in `standingPins`) */}
              {standingPins.includes(pin) && <span className="text-sm font-bold">{pin}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BowlingPins;
