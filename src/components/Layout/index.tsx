export default function LayoutComponent(props: any) {
  return (
    <div className="mx-auto bg-base-100 drawer">
      <input id="drawer" type="checkbox" className="drawer-toggle"></input>
      <div className="drawer-content">{props.children}</div>
      <div className="drawer-side z-40"></div>
    </div>
  );
}
