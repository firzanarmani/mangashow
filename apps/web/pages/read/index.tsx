import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import ONE_PIECE_CHAPTER_1078 from "./chapter";

// Fix from https://github.com/konvajs/react-konva/issues/588
const NoSsrReader = dynamic(
  () => import("reader/Reader").then((module) => module.Reader),
  { ssr: false }
);

export default function Read(): ReactElement {
  const [fitSize, setFitSize] = useState<"fullWidth" | "fullHeight">(
    "fullHeight"
  );

  return (
    <div
      id="page-container"
      className="h-screen bg-slate-800 flex flex-col justify-center relative"
    >
      <div id="header" className="flex flex-0 flex-row gap-4 w-full">
        <div
          id="chapter-details"
          className="flex flex-row w-full justify-center gap-2 p-1"
        >
          <div id="title" className="flex justify-center text-lg text-white">
            {ONE_PIECE_CHAPTER_1078.series_title}
          </div>
          <div id="number" className="flex justify-center text-lg text-white">
            - Chapter {ONE_PIECE_CHAPTER_1078.chapter_number}
          </div>
        </div>
      </div>
      <NoSsrReader readerObject={ONE_PIECE_CHAPTER_1078} />
    </div>
  );
}
