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
    <span className="text-red-800">{message}</span>
  </TextContainer>
);

export const Block = ({
  children,
  center = false,
}: {
  children: JSX.Element;
  center?: boolean;
}) => (
  <div className={`flex flex-col items-center ${center ? "col-span-2" : ""} `}>
    {children}
  </div>
);
