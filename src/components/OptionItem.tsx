interface OptionItemProps {
  text: string;
  isCorrect?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export default function OptionItem({
  text,
  isCorrect = false,
  isHighlighted = false,
  onClick,
}: OptionItemProps) {
  let classes =
    "bg-slate-600 rounded p-3 sm:p-4 w-full relative text-xs sm:text-base ";

  if (isCorrect) {
    classes += "border-l-4 border-green-500";
  }

  if (isHighlighted) {
    classes += "bg-fuchsia-500 text-black font-bold";
  }

  return (
    <div className={classes} onClick={onClick}>
      <p>{text}</p>
      {isCorrect && (
        <span className="absolute top-2 right-2 text-green-600 font-bold text-xs sm:text-sm">
          ✓ correct
        </span>
      )}
    </div>
  );
}
