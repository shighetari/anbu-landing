import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// I'm using this utility for clean className merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}