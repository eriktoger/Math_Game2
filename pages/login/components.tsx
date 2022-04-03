import { ChangeEvent } from "react";

export const Input = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex justify-center">
    <span className="inline-block w-20 ">{title}:</span>
    <input
      type={title === "Password" ? "password" : "text"}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => (
  <button className="p-1 border-2 rounded bg-gray-400 my-2" onClick={onClick}>
    {title}
  </button>
);
