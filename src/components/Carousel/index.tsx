"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ContentElement } from "src/types";
import CarouselCard from "../CarouselCard";
import { NextButton, PrevButton } from "./CarouselArrows";

export default function CarouselComponent(props: {
  items: ContentElement[];
  options: EmblaOptionsType;
}) {
  const { items, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-[calc(100vw-4rem)] md:w-[calc(100vw-12rem)] lg:w-[calc(100vw-19.5rem)]">
      <div className="w-full flex">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 touch-pan-y">
            {items.map((item) => (
              <div className="w-auto" key={item.id}>
                <CarouselCard
                  description={item.pending_content.description}
                  href={`${item.pending_content.content.language.name.toLowerCase()}/${item.pending_content.type.toLowerCase()}/${
                    item.id
                  }`}
                  language={item.pending_content.content.language.name}
                  level={item.pending_content.level}
                  title={item.pending_content.title}
                  type={item.pending_content.type}
                />
              </div>
            ))}
          </div>
        </div>
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
}
