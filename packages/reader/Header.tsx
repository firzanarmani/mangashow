import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ReactElement } from "react";
import { useReaderContext } from "./context";

export function Header(): ReactElement {
  const { series, chapterNumber } = useReaderContext((state) => ({
    series: state.series,
    chapterNumber: state.chapterNumber,
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "3rem",
        padding: "0.5rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ height: "2rem", width: "2rem" }}></div>
      <div
        style={{ color: "white", fontWeight: "normal" }}
      >{`${series} - Chapter ${chapterNumber}`}</div>
      <button
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          height: "2rem",
          width: "2rem",
        }}
      >
        <IconAdjustmentsHorizontal color="black" width="100%" />
      </button>
    </div>
  );
}

// If not loaded do not allow navigation (or just steps)
