export default function ChatBubble({
  talk,
  principal,
  row,
}: {
  talk: string[];
  principal: string;
  row: number;
}) {
  return (
    <div
      style={{
        gridRow: row + 1 + "/" + (row + 2),
        animationDelay: `${row * 0.2}s`,
      }}
      className={`chat ${
        talk[0] === principal ? "chat-end " : "chat-start"
      } chat-animated`}
    >
      <div className="chat-header text-base-content font-bold">{talk[0]}</div>
      <div
        className={`chat-bubble text-lg max-w-[15rem] ${
          talk[0] === principal ? "chat-bubble-success " : "chat-bubble-info"
        } `}
      >
        {talk[1]}
      </div>
    </div>
  );
}
