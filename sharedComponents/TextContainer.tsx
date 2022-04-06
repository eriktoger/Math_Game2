export default function TextContainer({
  children,
  full = false,
}: {
  children: JSX.Element;
  full?: boolean;
}) {
  return (
    <div
      className={`m-2 p-2 flex gap-4 bg-white bg-opacity-50 rounded ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </div>
  );
}
