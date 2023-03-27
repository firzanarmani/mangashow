import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Header } from "reader/Header";
import { Navigation } from "reader/Navigation";
import { ReaderProvider } from "reader/context";
import ONE_PIECE_CHAPTER_1078 from "../../chapter";
import { Shape } from "reader/types";

export default function Read(): ReactElement {
  // Fix from https://github.com/konvajs/react-konva/issues/588
  const Reader = dynamic(
    () => import("reader/Reader").then((module) => module.Reader),
    { ssr: false }
  );

  return (
    <ReaderProvider
      series={ONE_PIECE_CHAPTER_1078.series_title}
      chapterNumber={ONE_PIECE_CHAPTER_1078.chapter_number}
      pages={ONE_PIECE_CHAPTER_1078.pages}
      pageNo={0}
      shapes={(() => {
        const map = new Map<number, Shape[]>();
        ONE_PIECE_CHAPTER_1078.pages.forEach((page, index) =>
          map.set(index, page.shapes)
        );
        return map;
      })()}
    >
      <div
        id="page-container"
        className="inset-0 bg-black flex flex-col justify-center absolute"
      >
        <div className="w-full flex-0">
          <Header />
        </div>
        <div className="w-full h-full flex">
          <Reader />
        </div>
        <div className="w-full flex-0">
          <Navigation />
        </div>
      </div>
    </ReaderProvider>
  );
}
