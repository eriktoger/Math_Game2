import { ChangeEvent } from "react";

export const Input = ({
  title,
  value,
  onChange,
  isPassword = false,
}: {
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}) => (
  <div className="flex justify-center">
    <span className="inline-block w-32">{title}:</span>
    <input
      size={10}
      type={isPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const Button = ({
  title,
  onClick,
  disabled = false,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    className={
      "p-1 border-2 rounded bg-gray-400 my-2" + (disabled ? " opacity-50" : "")
    }
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);
