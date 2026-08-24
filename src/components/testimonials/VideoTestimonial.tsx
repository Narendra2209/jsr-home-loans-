import React, { useState } from "react";
import { Play } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

/**
 * A click-to-play facade for a YouTube testimonial.
 *
 * Embedding YouTube directly loads several hundred kilobytes and sets tracking
 * cookies on every visitor, whether or not they watch. This renders only the
 * thumbnail until someone actually clicks, then swaps in the player from the
 * no-cookie domain.
 */
const VideoTestimonial: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const [playing, setPlaying] = useState(false);

  if (!testimonial.videoId) return null;

  const title = `${testimonial.name}, ${testimonial.loanType} customer in ${testimonial.area}`;

  return (
    <figure className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="relative aspect-video bg-muted">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video testimonial from ${testimonial.name}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-brand/30 transition group-hover:bg-brand/40">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow">
                <Play className="h-7 w-7 translate-x-0.5 fill-brand text-brand" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">
          {testimonial.loanType} · {testimonial.area}
        </p>
      </figcaption>
    </figure>
  );
};

export default VideoTestimonial;
