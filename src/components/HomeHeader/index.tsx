"use client";
import React, { useRef } from "react";
import Modal from "../Modal";
import { IFlags, Languages, LanguagesSelectionProps } from "src/types";

import ukFlag from "public/images/flags/uk_flag.png";
import spainFlag from "public/images/flags/spain_flag.png";
import franceFlag from "public/images/flags/france_flag.png";
import italianFlag from "public/images/flags/italy_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japan_flag.png";
import generic from "public/images/generic/test.png";
import flagsDisplayGif from "public/images/flags/flags_display.gif";
import Link from "next/link";

const LanguagesSelection = (props: LanguagesSelectionProps) => (
  <div className="grid grid-cols-2 gap-4">
    {props.props.flags.map((v) => (
      <button
        onClick={() => props.props.onClick(v)}
        key={v.language}
        className="inline-flex mx-auto items-center justify-start"
      >
        <div data-tip={v.displayName} className="tooltip">
          <img src={v.flagUrl.src} alt={""} className="w-32 h-16" />
        </div>
      </button>
    ))}
  </div>
);

const flags: IFlags[] = [
  {
    language: Languages.english,
    flagUrl: ukFlag,
    displayName: "English",
  },
  {
    language: Languages.spanish,
    flagUrl: spainFlag,
    displayName: "Spanish",
  },
  { language: Languages.german, flagUrl: germanFlag, displayName: "German" },
  { language: Languages.italian, flagUrl: italianFlag, displayName: "Italian" },
  {
    language: Languages.japanese,
    flagUrl: japaneseFlag,
    displayName: "Japanese",
  },
  { language: Languages.french, flagUrl: franceFlag, displayName: "French" },
];

const FlagRandomDisplay = () => (
  <img className="w-20 h-10 ml-3 shadow-sm" src={flagsDisplayGif.src} alt="" />
);

export default function HomeHeader() {
  const modalRef = useRef<any>(null);

  const onShowModal = () => {
    modalRef.current!.showModal();
  };

  const onLanguageSelect = (v: any) => {
    console.log(v);
  };

  return (
    <>
      <header className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
        <div className="relative">
          <div className="relative mx-auto flex items-center flex-col">
            <h1 className="text-6xl leading-6 font-black text-center inline-flex items-center">
              Learn Languages Online <FlagRandomDisplay />
            </h1>
            <p className="mt-6 text-xl text-base-content/60 font-light">
              Learn the desired language you want with online tools and content,
              all for free!
            </p>
            <div className="mt-6 inline-flex items-center w-full flex-col justify-center gap-2 px-4 md:flex-row xl:px-0">
              <button
                className="btn md:btn-lg md:btn-wide group px-12 normal-case"
                onClick={onShowModal}
              >
                Select Language
              </button>
              <Link
                className="btn btn-neutral md:btn-lg md:btn-wide group px-12 normal-case"
                href={"/auth/signin"}
              >
                Login
              </Link>
            </div>
            <section className="flex flex-col gap-y-5">
              <div>
                <h2>READING</h2>
                <p>lorem ipsum</p>
                <a className="link" href="/english/reading">
                  Go to Reading
                </a>
              </div>
              <div>
                <img src={generic.src} alt="" />
              </div>
            </section>
          </div>
        </div>
      </header>
      <Modal
        props={{
          ref: modalRef,
          title: "Select Language",
          content: (
            <LanguagesSelection props={{ flags, onClick: onLanguageSelect }} />
          ),
        }}
      />
    </>
  );
}
