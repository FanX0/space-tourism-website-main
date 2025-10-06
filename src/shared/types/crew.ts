import type { ImagePair } from "./images";

export interface Crew {
  name: string;
  images: ImagePair;
  role: string;
  bio: string;
}
