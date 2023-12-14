"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CarouselCard from "../CarouselCard";
import { ContentElement } from "src/types";

export default function CarouselComponent(props: { items: ContentElement[] }) {
  const { items } = props;

  return (
    <div className="flex max-w-[calc(100vw-11.2rem)]">
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={10}
        navigation
      >
        {items && items.length > 0
          ? items.map((item, i) => (
              <SwiperSlide className="!w-auto" key={i}>
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
              </SwiperSlide>
            ))
          : "No records"}
      </Swiper>
    </div>
  );
}
