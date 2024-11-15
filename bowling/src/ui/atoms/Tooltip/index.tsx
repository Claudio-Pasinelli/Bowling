import React, { useEffect, useState } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props {
  message: string;
  error?: boolean;
  duration?: number;
  onClose?: () => void; // funzione opzionale da chiamare alla chiusura del tooltip
}

const Tooltip = ({ message, error = false, duration = 1500, onClose }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // imposta un timeout per nascondere il tooltip dopo la durata specificata
    const timeoutId = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // il componente Tooltip userà il metodo passatogli dal padre setShowTooltip(false)
    }, duration);

    // pulisci il timeout quando il componente viene nascosto
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  if (!visible) return null; // non mostra nulla se il tooltip non è visibile

  return (
    <div
      className={cn(
        'absolute top-[2.5%] size-auto rounded-md p-2 shadow-md transition-opacity',
        error ? 'text-red-700 bg-red-100/30' : 'text-green-700 bg-green-100/30',
      )}>
      {message}
    </div>
  );
};

export default Tooltip;
