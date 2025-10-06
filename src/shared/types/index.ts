export * from "./images";
export * from "./destination";
export * from "./crew";
export * from "./technology";

export interface SpaceData {
  destinations: import("./destination").Destination[];
  crew: import("./crew").Crew[];
  technology: import("./technology").Technology[];
}
