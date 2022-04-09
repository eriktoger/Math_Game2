export default function TextContainer({
  children,
  full = false,
}: {
  children: JSX.Element;
  full?: boolean;
}) {
  return (
    <div
      className={`m-2 p-2 flex gap-4  rounded ${full ? "w-full" : ""}`}
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
    >
      {children}
    </div>
  );
}
