
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "Coding setup with laptop",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Tech workspace",
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Development environment",
  },
];

export function PhotoGallery() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl mx-auto mt-8"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index}>
            <Card className="border-none">
              <CardContent className="p-0">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-64 object-cover rounded-lg transition-all duration-200 hover:scale-[1.02]"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
