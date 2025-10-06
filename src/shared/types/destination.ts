import type { ImagePair } from "./images";

export interface Destination {
  name: string;
  images: ImagePair;
  description: string;
  distance: string;
  travel: string;
}
