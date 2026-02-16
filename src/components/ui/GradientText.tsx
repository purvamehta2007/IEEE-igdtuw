import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: 'blue-purple' | 'purple-pink' | 'blue-violet';
}

export function GradientText({ children, className = '', gradient = 'blue-purple' }: GradientTextProps) {
  const gradients = {
    'blue-purple': 'bg-gradient-to-r from-[#00D9FF] via-purple-500 to-violet-600',
    'purple-pink': 'bg-gradient-to-r from-purple-500 via-violet-600 to-pink-500',
    'blue-violet': 'bg-gradient-to-r from-[#00D9FF] to-violet-600',
  };

  return (
    <span
      className={`
        ${gradients[gradient]}
        bg-clip-text text-transparent
        font-bold
        ${className}
      `}
    >
      {children}
    </span>
  );
}
