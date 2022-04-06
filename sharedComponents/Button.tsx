export default function Button({
  title,
  onClick,
  disabled = false,
  children,
}: {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const disableStyle = disabled ? "opacity-50" : "";
  const content = children ?? title;
  return (
    <button
      className={`m-2 p-1 border-2 rounded bg-gray-400 w-fit ${disableStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
