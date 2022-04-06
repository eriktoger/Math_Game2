import { ChangeEvent } from "react";
import { TextContainer } from "@/sharedComponents";

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
  <div>
    <span className="inline-block w-32">{title}:</span>
    <input
      size={10}
      type={isPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <TextContainer>
    <text className="text-red-800">{message}</text>
  </TextContainer>
);

export const Block = ({ children }: { children: JSX.Element }) => (
  <div className="flex flex-col items-center">{children}</div>
);
