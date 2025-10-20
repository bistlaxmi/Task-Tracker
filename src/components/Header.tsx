interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-teal-600">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 text-sm sm:text-base mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default Header;
