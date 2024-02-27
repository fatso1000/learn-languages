"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ContentElement } from "src/types";
import CarouselCard from "../CarouselCard";

const CarouselArrow = (props: {
  onClick: () => void;
  disabled: boolean;
  type: "prev" | "next";
}) => {
  return (
    <button
      className="disabled:opacity-30 transition-all"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.type === "prev" ? (
        <svg className="w-8" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          />
        </svg>
      ) : (
        <svg className="w-8" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          />
        </svg>
      )}
    </button>
  );
};

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
    <div className="w-[calc(100vw-4rem)] md:w-[calc(100vw-12rem)] lg:w-[calc(100vw-19.5rem)] embla">
      <div className="w-full flex">
        <CarouselArrow
          type="prev"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item) => (
              <div className="embla__slide" key={item.id}>
                <CarouselCard
                  description={item.pending_content.description}
                  href={`${item.pending_content.content.language.name.toLowerCase()}/${item.pending_content.type.toLowerCase()}/${
                    item.id
                  }?userId=${item.user_content_id}`}
                  level={item.pending_content.level}
                  title={item.pending_content.title}
                  type={item.pending_content.type}
                />
              </div>
            ))}
          </div>
        </div>
        <CarouselArrow
          type="next"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
}
