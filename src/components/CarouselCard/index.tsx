import { Link } from "src/shared/navigation";
import { CarouselCardProps } from "src/types";

export default function CarouselCard(props: CarouselCardProps) {
  const { href, level, title, type, description } = props;
  return (
    <Link
      href={href}
      className="card card-compact border-2 hover:bg-base-200/30 transition"
    >
      <div className="card-body">
        <div>
          <h2 className="card-title font-bold">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="inline-flex gap-1">
          <div className="badge font-bold bg-base-100">{level}</div>
          <div className="badge font-bold bg-base-100">{type}</div>
        </div>
      </div>
    </Link>
  );
}
