import Link from "next/link";
import { CarouselCardProps } from "src/types";

export default function CarouselCard(props: CarouselCardProps) {
  const { href, language, level, title, type, description } = props;
  return (
    <Link
      href={href}
      className="card card-compact border border-primary hover:bg-primary/20 transition"
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="inline-flex gap-1">
          <div className="badge font-black bg-base-100">{level}</div>
          <div className="badge font-black bg-base-100">{language}</div>
          <div className="badge font-black bg-base-100">{type}</div>
        </div>
      </div>
    </Link>
  );
}
