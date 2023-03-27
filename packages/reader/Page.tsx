import { ReactElement, useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { useReaderContext } from "./context";
import { LoadingSpinner } from "./LoadingSpinner";

declare global {
  interface Window {
    Konva: any;
  }
}

window.Konva = window.Konva || {};

export function Page(): ReactElement {
  const {
    fit,
    height,
    width,
    scale,
    pageNo,
    pages,
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
    shapeVisible: state.shapeVisible,
    setDimensions: state.setDimensions,
    setShapeVisible: state.setShapeVisible,
  }));
  const [image, imageStatus] = useImage(pages[pageNo].src);
  const Konva = window.Konva;

  const [lastCenter, setLastCenter] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lastDist, setLastDist] = useState(0);

  function getDistance(
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCenter(
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

  useEffect(() => {
    Konva.hitOnDragEnabled = true;
  }, []);

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
      height={height}
      width={width}
      scale={scale}
      style={{ alignItems: "center" }}
      draggable={true}
      onTouchMove={(e) => {
        e.evt.preventDefault();
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];

        if (touch1 && touch2) {
          if (e.target.isDragging()) {
            e.target.stopDrag();
          }

          const point1 = {
            x: touch1.clientX,
            y: touch1.clientY,
          };

          const point2 = {
            x: touch2.clientX,
            y: touch2.clientY,
          };

          if (!lastCenter) {
            setLastCenter(getCenter(point1, point2));
            return;
          }

          const newCenter = getCenter(point1, point2);
          const dist = getDistance(point1, point2);

          if (!lastDist) {
            setLastDist(dist);
          }

          const pointTo = {
            x: (newCenter.x - e.target.x()) / e.target.scaleX(),
            y: (newCenter.y - e.target.y()) / e.target.scaleX(),
          };

          const scale = e.target.scaleX() * (dist / lastDist);

          e.target.scaleX(scale);
          e.target.scaleY(scale);

          const dx = newCenter.x - lastCenter.x;
          const dy = newCenter.y - lastCenter.y;

          const newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          e.target.position(newPos);

          setLastDist(dist);
          setLastCenter(newCenter);
        }
      }}
      onTouchEnd={() => {
        setLastDist(0);
        setLastCenter(null);
      }}
    >
      <Layer id="background" listening={false}>
        <Image
          image={image}
          height={pages[pageNo].height}
          width={pages[pageNo].width}
          listening={false}
        />
      </Layer>

      <Layer id="shapes">
        {pages[pageNo].shapes.map((rect, i) => {
          return <Rect key={i} {...rect} visible={shapeVisible[i]} />;
        })}
      </Layer>
    </Stage>
  );
}
