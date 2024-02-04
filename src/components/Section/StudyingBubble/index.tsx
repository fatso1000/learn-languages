export default function StudyingBubble() {
  return (
    <div className="absolute -top-12 flex flex-col items-center animate-bounce z-30 bubble">
      <div className="w-32 h-16 border-base-300 border-2 rounded-md bg-base-100 flex items-center justify-center font-bold text-xl shadow">
        Empezar
      </div>
      <div className="w-4 h-4 border-base-300 border-b-2 border-r-2 bg-base-100 rotate-45 -top-2 relative"></div>
    </div>
  );
}
