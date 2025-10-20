import React from "react";

interface CardProps {
  title: string;
  count: number | string;
  color?: string;
  icon?: React.ReactNode;
}

const Card = ({ title, count, color, icon }: CardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full transition hover:shadow-md hover:-translate-y-1 duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm sm:text-base text-slate-600 font-medium">
          {title}
        </h3>
        {icon && <div className={`text-2xl sm:text-3xl ${color}`}>{icon}</div>}
      </div>
      <p className={`text-2xl sm:text-3xl font-semibold ${color}`}>{count}</p>
    </div>
  );
};

export default Card;
