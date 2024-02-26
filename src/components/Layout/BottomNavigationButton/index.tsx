import { Link } from "src/shared/navigation";

export default function BottomNavigationButton({
  href,
  icon,
  pathname,
}: {
  href: string;
  icon: JSX.Element;
  pathname: string | null;
}) {
  return (
    <Link
      href={href}
      className={
        pathname === href || (pathname && href.includes(pathname))
          ? "text-info border-2 border-info bg-info/10 rounded-lg select-none"
          : "text-neutral-600 select-none"
      }
    >
      {icon}
    </Link>
  );
}
