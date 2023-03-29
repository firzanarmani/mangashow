import { createStore, StateCreator } from "zustand";
import { PageObject, Shape } from "./types";

type ReaderSlice = {
  fit: "fullWidth" | "fullHeight" | "fitScreen";
  height: number;
  width: number;
  scale: { x: number; y: number };
  pageNo: number;
  zoomScale: number;
  setFit: (fit: ReaderSlice["fit"]) => void;
  setDimensions: (
    height: ReaderSlice["height"],
    width: ReaderSlice["width"],
    scale: ReaderSlice["scale"]
  ) => void;
  prevPage: () => void;
  nextPage: () => void;
  setPageNo: (pageNo: ReaderSlice["pageNo"]) => void;
  goToPage: (pageNo: ReaderSlice["pageNo"]) => void;
  setZoomScale: (number: ReaderSlice["zoomScale"]) => void;
};

const createReaderSlice: StateCreator<ReaderSlice, [], [], ReaderSlice> = (
  set
) => ({
  fit: "fitScreen",
  height: 0,
  width: 0,
  scale: { x: 1, y: 1 },
  pageNo: 0,
  zoomScale: 100,
  setFit: (fit) => set((state) => ({ fit })),
  setDimensions: (height, width, scale) =>
    set((state) => ({ height, width, scale })),
  prevPage: () => set((state) => ({ pageNo: state.pageNo - 1 })),
  nextPage: () => set((state) => ({ pageNo: state.pageNo + 1 })),
  setPageNo: (pageNo) => set((state) => ({ pageNo })),
  goToPage: (pageNo) => set((state) => ({ pageNo })),
  setZoomScale: (zoomScale) => set((state) => ({ zoomScale })),
});

export type ChapterSlice = {
  series: string;
  chapterNumber: number;
  source: string;
  pages: PageObject[];
  setSeries: (series: ChapterSlice["series"]) => void;
  setChapterNumber: (chapterNumber: ChapterSlice["chapterNumber"]) => void;
  setSource: (source: ChapterSlice["source"]) => void;
  setPages: (pages: ChapterSlice["pages"]) => void;
};

const createChapterSlice: StateCreator<ChapterSlice, [], [], ChapterSlice> = (
  set
) => ({
  series: "",
  chapterNumber: 0,
  source: "",
  pages: [],
  setSeries: (series) => set((state) => ({ series })),
  setChapterNumber: (chapterNumber) => set((state) => ({ chapterNumber })),
  setSource: (source) => set((state) => ({ source })),
  setPages: (pages) => {
    set((state) => ({ pages }));
  },
});

export type PageSlice = {
  currentStep: number;
  shapes: Map<number, Shape[]>;
  shapeVisible: boolean[];
  setCurrentStep: (currenStep: number) => void;
  prevStep: () => void;
  nextStep: () => void;
  initShapesVisible: (shapes: Shape[]) => void;
  setShapes: (pageNo: number, shapes: Shape[]) => void;
  setShapeVisible: (index: number | number[], visible: boolean) => void;
  hideAllShapes: () => void;
};

const createPageSlice: StateCreator<
  PageSlice & ReaderSlice & ChapterSlice,
  [],
  [],
  PageSlice
> = (set) => ({
  currentStep: 0,
  shapes: new Map(),
  shapeVisible: [],
  setCurrentStep: (currentStep) => set((state) => ({ currentStep })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  initShapesVisible: (shapes) => set((state) => ({})),
  setShapes: (pageNo, shapes) =>
    set((state) => ({ shapes: state.shapes.set(pageNo, shapes) })),
  setShapeVisible: (index, visible) =>
    set((state) => {
      const newArr = state.shapeVisible.slice();
      if (typeof index === "number") {
        newArr[index] = visible;
      } else {
        index.forEach((i) => (newArr[i] = visible));
      }
      return { shapeVisible: newArr };
    }),
  hideAllShapes: () =>
    set((state) => ({ shapeVisible: state.shapeVisible.map(() => false) })),
});

export type ReaderStoreParams = ReaderSlice & ChapterSlice & PageSlice;
export type ReaderStore = ReturnType<typeof createReaderStore>;

export const createReaderStore = (initProps?: Partial<ReaderStoreParams>) => {
  return createStore<ReaderSlice & PageSlice & ChapterSlice>()((...a) => ({
    ...createReaderSlice(...a),
    ...createChapterSlice(...a),
    ...createPageSlice(...a),
    ...initProps,
  }));
};
