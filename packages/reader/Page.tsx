import { ReactElement, useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import { useReaderContext } from "./context";
import { LoadingSpinner } from "./LoadingSpinner";

export function Page(): ReactElement {
  const {
    fit,
    height,
    width,
    scale,
    pageNo,
    pages,
    zoomScale,
    shapeVisible,
    setDimensions,
    setShapeVisible,
  } = useReaderContext((state) => ({
    fit: state.fit,
    height: state.height,
    width: state.width,
    scale: state.scale,
    pageNo: state.pageNo,
    pages: state.pages,
    zoomScale: state.zoomScale,
    shapeVisible: state.shapeVisible,
    setDimensions: state.setDimensions,
    setShapeVisible: state.setShapeVisible,
  }));
  const [image, imageStatus] = useImage(pages[pageNo].src);

  useEffect(() => {
    pages[pageNo].shapes.map((shape, index) =>
      setShapeVisible(index, shape.visible)
    );

    if (imageStatus === "loaded") {
      setDimensions(pages[pageNo].height, pages[pageNo].width, { x: 1, y: 1 });
    }
  }, [pages, pageNo]);

  if (imageStatus === "loading") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
        <div style={{ color: "white", fontSize: "0.875rem" }}>Loading page</div>
      </div>
    );
  }

  if (imageStatus === "failed") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "0.875rem" }}>
          Unable to load page
        </div>
      </div>
    );
  }

  return (
    <Stage
      height={height * (zoomScale / 100)}
      width={width * (zoomScale / 100)}
      scale={{ x: scale.x * (zoomScale / 100), y: scale.y * (zoomScale / 100) }}
    >
      <Layer id="background" listening={false}>
        <Image
          image={image}
          height={pages[pageNo].height}
          width={pages[pageNo].width}
        />
      </Layer>

      <Layer id="shapes" listening={false}>
        {pages[pageNo].shapes.map((rect, i) => {
          return <Rect key={i} {...rect} visible={shapeVisible[i]} />;
        })}
      </Layer>
    </Stage>
  );
}
