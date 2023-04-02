import { type ReactElement, useEffect, useRef } from "react";
import "./styles.css";
import { useReaderContext } from "./context";
import { PageObject } from "./types";
import { Page } from "./Page";

export function Reader(): ReactElement {
  const { fit, pageNo, pages, setDimensions, setStageSize } = useReaderContext(
    (state) => ({
      fit: state.fit,
      pageNo: state.pageNo,
      pages: state.pages,
      setDimensions: state.setDimensions,
      setStageSize: state.setStageSize,
    })
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function fitStageIntoParentContainer(
      container: HTMLDivElement,
      page: PageObject
    ) {
      if (container && container.offsetHeight && container.offsetWidth) {
        setStageSize({
          height: container.offsetHeight,
          width: container.offsetWidth,
        });
        // fitScreen
        let scale = Math.min(
          container.offsetHeight / page.height,
          container.offsetWidth / page.width
        );

        if (fit === "fullHeight") {
          scale = container.offsetHeight / page.height;
        } else if (fit === "fullWidth") {
          scale = container.offsetWidth / page.width;
        }

        setDimensions(page.height * scale, page.width * scale, {
          x: scale,
          y: scale,
        });
      }
    }

    const tempRef = containerRef.current!;
    // Re-adjust stage dimensions on first render
    fitStageIntoParentContainer(tempRef, pages[pageNo]);

    // Attach resize listener
    window.addEventListener("resize", () =>
      fitStageIntoParentContainer(tempRef, pages[pageNo])
    );

    // Cleanup resize listener
    return () => {
      window.removeEventListener("resize", () =>
        fitStageIntoParentContainer(tempRef, pages[pageNo])
      );
    };
  }, [fit, pages, pageNo, setDimensions]);

  const fitStyles = ({
    fitType,
  }: {
    fitType: typeof fit;
  }): {
    height?: string;
    width?: string;
    alignItems?: string;
    justifyContent?: string;
  } => {
    const fullHeight = "calc(100dvh - 3rem - 4.5rem)";

    if (fitType === "fullWidth") {
      return {
        width: "100%",
        alignItems: "",
      };
    } else if (fitType === "fullHeight") {
      return {
        height: fullHeight,
        alignItems: "start",
      };
    }

    return {
      height: fullHeight,
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  return (
    <div
      id="container"
      style={{
        display: "flex",
        // position: "absolute",
        overflow: "hidden",
        ...fitStyles({ fitType: fit }),
      }}
      ref={containerRef}
    >
      <Page />
    </div>
  );
}
