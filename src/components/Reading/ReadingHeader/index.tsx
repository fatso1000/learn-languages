"use client";

import { Link } from "src/shared/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftShort,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "src/components/Icons";
import { addOrRemoveUserContent } from "src/queryFn";

export default function ReadingHeader(props: {
  isMarked: boolean;
  userId?: string;
  content_id?: string;
  language?: string;
}) {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    setIsMarked(props.isMarked);
  }, []);

  const onMarkClick = async () => {
    if (!props.userId) return;
    await addOrRemoveUserContent(props.content_id!, props.userId);
    setIsMarked(!isMarked);
  };

  return (
    <div className="inline-flex gap-3">
      <Link className="btn" href={`/${props.language}/reading`}>
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
  );
}
