import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gridPlacement(index: number, totalCounts: number): string {
  const imageIndex = index + 1;
  const cycleNumber = Math.floor(totalCounts / 9);

  for (let i = 1; i <= cycleNumber; i++) {
    if (imageIndex === i * 9 - (i % 2 === 0 ? 2 : 1)) {
      return 'col-span-2 row-span-2';
    }
  }

  return '';
}