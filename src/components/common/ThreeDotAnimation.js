export const ThreeDotAnimation = ({ loading }) => {
  const baseClass = "w-2 h-2 rounded-full bg-(--color-primary)";

  return (
    <div className="flex items-center gap-2 mx-auto">
      <span
        className={`${baseClass} ${loading ? "animate-bounce-delay-1" : ""}`}
      />
      <span
        className={`${baseClass} ${loading ? "animate-bounce-delay-2" : ""}`}
      />
      <span
        className={`${baseClass} ${loading ? "animate-bounce-delay-3" : ""}`}
      />
    </div>
  );
};
