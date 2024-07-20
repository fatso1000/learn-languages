"use client";
import { Link } from "src/shared/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftShort,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "src/components/Icons";
import { addOrRemoveUserContent } from "src/queryFn";

export default function ListeningHeader(props: {
  isMarked: boolean;
  userId?: string;
  contentId?: string;
  language?: string;
}) {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    setIsMarked(props.isMarked);
  }, []);

  const onMarkClick = async () => {
    if (!props.userId) return;
    await addOrRemoveUserContent(props.contentId!, props.userId);
    setIsMarked(!isMarked);
  };

  return (
    <header className="mb-4 border-b-2 xl:border-0 pb-4 xl:pb-0">
      <div className="inline-flex gap-3">
        <Link className="btn" href={`/${props.language}/listening`}>
          <ArrowLeftShort />
        </Link>
        {props.userId && (
          <button
            className="btn"
            onClick={onMarkClick}
            title={isMarked ? "Remove from bookmark" : "Add to bookmark"}
          >
            {isMarked ? <BookmarkSlashIcon /> : <BookmarkIcon />}
          </button>
        )}
      </div>
    </header>
  );
}
