import type { ReactNode } from 'react';

interface CartoonButtonProps {
  label?: string;
  children?: ReactNode;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  wrapperClassName?: string;
  icon?: ReactNode;
  'aria-pressed'?: boolean;
}

export function CartoonButton({
  label,
  children,
  color = 'bg-primary',
  hasHighlight = true,
  disabled = false,
  onClick,
  href,
  type = 'button',
  className = '',
  wrapperClassName = '',
  icon,
  'aria-pressed': ariaPressed,
}: CartoonButtonProps) {
  const content = children ?? label;
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div className={`inline-block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${wrapperClassName}`}>
      {href ? (
        <a
          href={href}
          className={`relative inline-flex h-12 cursor-pointer items-center gap-3 overflow-hidden rounded-full border-2 border-neutral-800 px-6 font-bold text-neutral-800 transition-all duration-150 group ${color} hover:shadow-[0_4px_0_0_#262626] hover:-translate-y-1 active:translate-y-0 active:shadow-none ${className}`}
        >
          <span className="relative z-10 whitespace-nowrap">{content}</span>
          {icon && <span className="relative z-10 inline-flex">{icon}</span>}
          {hasHighlight && (
            <span aria-hidden="true" className="absolute top-1/2 left-[-100%] h-24 w-16 -translate-y-1/2 rotate-12 bg-white/50 transition-all duration-500 ease-in-out group-hover:left-[200%]" />
          )}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={handleClick}
          aria-pressed={ariaPressed}
          className={`relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full border-2 border-neutral-800 px-6 font-bold text-neutral-800 transition-all duration-150 group ${color} hover:shadow-[0_4px_0_0_#262626]
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:-translate-y-1 active:translate-y-0 active:shadow-none'} ${className}`}
        >
          {icon && <span className="relative z-10 inline-flex">{icon}</span>}
          <span className="relative z-10 whitespace-nowrap">{content}</span>
          {hasHighlight && !disabled && (
            <span aria-hidden="true" className="absolute top-1/2 left-[-100%] h-24 w-16 -translate-y-1/2 rotate-12 bg-white/50 transition-all duration-500 ease-in-out group-hover:left-[200%]" />
          )}
        </button>
      )}
    </div>
  );
}
