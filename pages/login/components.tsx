import { ChangeEvent } from "react";
import { TextContainer } from "@/sharedComponents";

export const Input = ({
  title,
  value,
  onChange,
  type = "text",
}: {
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <input
    className="m-1 px-1 rounded"
    placeholder={title}
    size={10}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <TextContainer>
    <span className="text-red-800">{message}</span>
  </TextContainer>
);

export const Block = ({
  children,
}: {
  children: JSX.Element;
  center?: boolean;
}) => <div className={`flex flex-col items-center mx-2 `}>{children}</div>;
