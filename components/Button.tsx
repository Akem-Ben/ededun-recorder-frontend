export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  type?: any;
  disabled?: boolean;
  backgroundColor?: string;
  onClick?: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
  type = "button",
  disabled,
  backgroundColor = "#3277AC",
  onClick,
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{ borderRadius, height, backgroundColor }}
      className={`flex hover:cursor-pointer border-[#000000] border-2 border hover:border-[#E0DEF7] hover:border-2 hover:bg-white hover:text-black font-[700] text-white text-base h-[48px] justify-center items-center px-6 py-[12px] w-full sm:auto ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
      <button type={type} disabled={disabled}>
        {children || title}
      </button>
    </div>
  );
};

//[150px]
export default Button;
