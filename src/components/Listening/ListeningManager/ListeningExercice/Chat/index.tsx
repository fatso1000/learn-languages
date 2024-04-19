"use client";
import { ArrowLeftShort } from "src/components/Icons";
import ChatBubble from "./ChatBubble";
import { useEffect, useState } from "react";
import { PendingContent } from "src/types";

export default function Chat({
  details,
  exerciceCompleted,
}: {
  details: PendingContent;
  answeredSection?: number;
  exerciceCompleted: number;
}) {
  const [haveScroll, setHaveScroll] = useState<boolean>();
  const [inTop, setInTop] = useState<boolean>();

  useEffect(() => {
    const chat = document.querySelector(".chat-container");
    const messages = chat?.children.item(0);
    if (!chat) return;

    function scrollHandler() {
      if (!chat) return;
      setInTop(chat.scrollHeight / 5 > chat.scrollTop);
    }
    if (messages) setHaveScroll(messages.clientHeight > 496);
    chat.addEventListener("scroll", scrollHandler);

    return () => {
      chat.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollToTop = () => {
    const chat = document.querySelector(".chat-container");
    chat?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    const chat = document.querySelector(".chat-container");
    chat?.scrollTo({ top: chat?.scrollHeight, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div className="mb-4 max-h-[31rem] overflow-y-auto border-2 rounded-md !relative chat-container">
        {details.stories && details.principal && (
          <div className={`p-4 ${haveScroll ? " pr-14" : ""}`}>
            {details.stories.map((talks: string[][], i: number) => {
              if (exerciceCompleted >= i) {
                return talks.map((talks: string[], i: number) => (
                  <ChatBubble
                    key={i}
                    talk={talks}
                    principal={details.principal!}
                    row={i}
                  />
                ));
              }
              return null;
            })}
          </div>
        )}
      </div>

      {haveScroll &&
        (inTop ? (
          <button
            className="!absolute bottom-2 right-0 p-2 mr-4 z-40 arrow bg-success text-success-content rounded-full flex"
            onClick={scrollToBottom}
          >
            <ArrowLeftShort className="h-6 w-6 -rotate-90" />
          </button>
        ) : (
          <button
            className="!absolute bottom-2 right-0 p-2 mr-4 z-40 arrow bg-success text-success-content rounded-full flex"
            onClick={scrollToTop}
          >
            <ArrowLeftShort className="h-6 w-6 rotate-90" />
          </button>
        ))}
    </div>
  );
}
