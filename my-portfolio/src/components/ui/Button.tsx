import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  icon,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    fullWidth && 'btn--full-width',
    variant === 'primary' && 'pixel-shadow pixel-shadow-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
      {icon}
    </button>
  );
}
