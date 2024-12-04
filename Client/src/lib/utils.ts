import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  if (!fullName) return ""; // Handle empty input
  const names = fullName.trim().split(/\s+/); // Split by spaces, trim extra spaces
  if (names.length === 1) {
    // Single name
    return names[0].charAt(0).toUpperCase();
  } else {
    // Two or more names
    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }
}

export const getAvatarColor = (name: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  // Use a simple hash to choose a color
  const index = name
    ? name.charCodeAt(0) % colors.length // Use first char to determine color
    : 0;
  return colors[index];
};
