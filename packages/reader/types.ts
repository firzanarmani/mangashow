export type Shape = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  name: string;
  visible: boolean;
  id: string;
};

export type PageObject = {
  pageNo: number;
  src: string;
  alt: string;
  height: number;
  width: number;
  shapes: Shape[];
  shapeOrder: (number | number[])[];
};

export type ReaderObject = {
  series_title: string;
  chapter_number: number;
  source: string;
  pages: PageObject[];
};
