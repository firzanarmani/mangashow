import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import { Reader, type ReaderObject } from "reader/Reader";

// Fix from https://github.com/konvajs/react-konva/issues/588
const NoSsrReader = dynamic(
  () => import("reader/Reader").then((module) => module.Reader),
  { ssr: false }
);

const ONE_PIECE_CHAPTER_1054: ReaderObject = {
  series_title: "One Piece",
  chapter_number: 1054,
  source: "TCB Scans",
  pages: [
    {
      pageNo: 1,
      src: "https://dummyimage.com/1600x2200",
      alt: "One Piece Chapter 1054 Page 1",
      height: 1600,
      width: 2200,
      shapes: [],
      shapeOrder: [],
    },
    {
      pageNo: 2,
      src: "https://dummyimage.com/1600x1097",
      alt: "One Piece Chapter 1054 Page 2",
      height: 1600,
      width: 1097,
      shapes: [
        {
          x: 894.1480821151594,
          y: 64.01119594316336,
          width: 101.33948952268732,
          height: 103.61326186667993,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "dtU9xU9PFWZmkGpw2wiPtE",
          visible: true,
          id: "1",
        },
        {
          x: 904.8921079965303,
          y: 252.56731245828755,
          width: 138.92501163401764,
          height: 100.00000000000064,
          rotation: 13.699653335025882,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "mPXwvfnp3aTArVcFbo8ktU",
          visible: true,
          id: "2",
        },
        {
          x: 704.0746268656716,
          y: 140.88274750563937,
          width: 129.8507462686565,
          height: 55.23450498872107,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "escguMdGN9HWbhQbyfRZHm",
          visible: true,
          id: "3",
        },
        {
          x: 646.9867255460712,
          y: 253.89987949252847,
          width: 80.77810490436295,
          height: 59.95179701144781,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "odYM1SL7fZUjmsAmAwKYAo",
          visible: true,
          id: "4",
        },
        {
          x: 51.24875621890546,
          y: 136,
          width: 199.50248756218906,
          height: 100.00000000000003,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "8zeMu2odDoGLrzfox4kLEC",
          visible: true,
          id: "5",
        },
        {
          x: 131.99999999999994,
          y: 306.91791044776085,
          width: 100,
          height: 67.16417910447795,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "jR9ZEb9NX1RCJNQrB1khXD",
          visible: true,
          id: "6",
        },
        {
          x: 43.989066175739225,
          y: 368.8644346201769,
          width: 70.52458495956728,
          height: 45.77384807069224,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "oukuKeGE7pKDvNS8p35C9G",
          visible: true,
          id: "7",
        },
        {
          x: 350.69900497512407,
          y: 453.85074626865685,
          width: 379.6019900497511,
          height: 40.29850746268649,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "19KxJNEH6GqLjU35Pgea6g",
          visible: true,
          id: "8",
        },
        {
          x: -7.772349017314468,
          y: -1.0767029839068414,
          width: 1069.7100985040688,
          height: 469.31880643725634,
          fill: "white",
          stroke: "black",
          strokeWidth: 0.5,
          name: "9Pyb4eD1xALgCcjrCHsFL9",
          visible: true,
          id: "9",
        },
      ],
      shapeOrder: [8, 0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
      pageNo: 3,
      src: "https://dummyimage.com/1600x2200",
      alt: "One Piece Chapter 1054 Page 3",
      height: 1600,
      width: 2220,
      shapes: [],
      shapeOrder: [],
    },
  ],
};

export default function Read(): ReactElement {
  const [fitSize, setFitSize] = useState<"fullWidth" | "fullHeight">(
    "fullHeight"
  );

  return (
    <div
      id="page-container"
      className="h-screen bg-slate-800 flex flex-col justify-center relative"
    >
      <NoSsrReader readerObject={ONE_PIECE_CHAPTER_1054} />
    </div>
  );
}
