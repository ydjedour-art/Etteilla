import type { AssistantMessage } from "@/lib/types";

export function AssistantBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.sender === "utilisateur";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-primary text-white"
            : "bg-primary-light text-ink"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
