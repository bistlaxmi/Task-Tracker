import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Button = ({ label, onClick, icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-teal-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg hover:bg-teal-700 active:scale-95 transition"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
