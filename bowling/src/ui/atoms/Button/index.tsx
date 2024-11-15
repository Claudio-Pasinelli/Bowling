import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  title?: string;
  textSize?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function Button({
  text,
  title,
  textSize = 'text-xs',
  backgroundColor = 'bg-gray-100',
  textColor = 'text-white',
  className,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'flex h-10 w-full items-center justify-center rounded-3xl pr-1.5 text-center sm:w-44 sm:min-w-28 sm:max-w-44',
        backgroundColor,
        textColor,
        className,
      )}
      title={title}
      type="button"
      {...rest}>
      <section className="flex w-auto place-content-center items-center justify-center">
        {text ? <p className={cn('ml-3 font-medium', textSize)}>{text}</p> : null}
      </section>
    </button>
  );
}
