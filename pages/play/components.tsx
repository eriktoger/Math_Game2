interface ImageCointainerProps {
  revealOrder: number[];
  correctAnswers: number;
  children: JSX.Element | null;
}

export const ImageContainer = ({
  revealOrder,
  correctAnswers,
  children,
}: ImageCointainerProps) => (
  <div className="relative w-fit h-fit">
    <div className="absolute grid grid-cols-3  w-full h-full">
      {revealOrder.map((value) => {
        const hide = value >= correctAnswers;

        return (
          <div
            key={value}
            className={`bg-black z-10 transition-opacity duration-1000 ease-in-out ${
              hide ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
    {children}
  </div>
);
