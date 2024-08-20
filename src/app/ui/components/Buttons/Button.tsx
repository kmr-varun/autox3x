import React from 'react';

interface Button {
  onClick?: () => void;
  text: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<Button> = ({ onClick, text, variant = 'primary' }) => {
  const baseClasses = 'w-fit rounded w-44 px-8 py-2 text-sm font-medium focus:outline-none';
  const variantClasses = variant === 'primary'
    ? 'bg-[#080808] border-[1px] border-[#4F4F4F] text-white'
    : 'bg-white border-[1px] border-[#4F4F4F] text-[#080808]';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
