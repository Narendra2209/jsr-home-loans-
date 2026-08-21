import React from "react";
import { Slider } from "@/components/ui/slider";

type SliderFieldProps = {
  id: string;
  label: string;
  /** The formatted figure shown beside the label, and announced to screen readers. */
  value: string;
  min: number;
  max: number;
  step: number;
  sliderValue: number;
  onChange: (value: number) => void;
  /** Optional line under the slider, explaining what the number means. */
  hint?: string;
};

/**
 * The labelled slider every calculator on this site is built from.
 *
 * There were five copies of this — four of them byte-identical — one inside each
 * calculator. Four sliders that are meant to look and behave the same should not
 * be four pieces of code, so they are one.
 */
const SliderField: React.FC<SliderFieldProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  sliderValue,
  onChange,
  hint,
}) => (
  <div>
    <div className="flex items-baseline justify-between gap-3">
      <span id={id} className="text-sm text-muted-foreground">{label}</span>
      <span className="font-heading text-sm font-semibold tabular-nums">{value}</span>
    </div>
    <Slider
      className="mt-3"
      value={[sliderValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={([next]) => onChange(next)}
      aria-labelledby={id}
      aria-valuetext={value}
    />
    {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export default SliderField;
