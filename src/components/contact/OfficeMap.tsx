import React, { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directionsUrl, mapEmbedUrl, office } from "@/content/company";

/**
 * Click-to-load Google Map.
 *
 * A map iframe loads several hundred kilobytes and sets Google's cookies on
 * every visitor, whether or not they look at it — and it does so before the
 * page has finished rendering. This shows a static panel until someone asks for
 * the map, and the directions link works either way without loading anything.
 */
const OfficeMap: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="relative aspect-[16/10] w-full bg-muted sm:aspect-[16/7]">
        {loaded ? (
          <iframe
            src={mapEmbedUrl}
            title={`Map showing JSR Home Loan Services at ${office.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-brand p-6 text-center">
            <MapPin className="h-10 w-10 text-brand-accent" aria-hidden="true" />
            <p className="max-w-sm text-sm text-brand-foreground/85">{office.address}</p>
            <Button type="button" variant="hero" onClick={() => setLoaded(true)}>
              Show the map
            </Button>
            <p className="text-xs text-brand-foreground/60">
              Loads Google Maps, which sets its own cookies.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="font-semibold">Our office</p>
          <p className="mt-1 text-sm text-muted-foreground">{office.address}</p>
          <p className="mt-1 text-sm text-muted-foreground">{office.hours}</p>
        </div>
        <Button asChild variant="outline">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default OfficeMap;
