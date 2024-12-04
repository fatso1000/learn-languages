import { SettingsList } from "src/components/Layout";
import Navbar from "src/components/Navbar";

export default async function LayoutSettings(props: {
  children: any;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Navbar props={props.children} />
      <div className="mt-4 px-4 sm:px-4 md:px-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[70ch] m-auto md:border-2 md:rounded-md">
          <div className="md:p-7">{props.children}</div>
          <div className="md:border-l-2 md:p-7">
            <SettingsList locale={(await props.params).locale} />
          </div>
        </section>
      </div>
    </>
  );
}
