import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une clases de Tailwind resolviendo conflictos. La usan los
 *  componentes de shadcn / 21st.dev tal cual. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
