import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageType } from "konva/lib/Stage";
import { Layer as LayerType } from "konva/lib/Layer";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Group, Image, Layer, Rect, Stage } from "react-konva";
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
    stageSize,
    shapeVisible,
    setDimensions,
    setShapeVisible,
    setZoomScale,
  } = useReaderContext((state) => ({
    fit: state.fit,
    height: state.height,
    width: state.width,
    scale: state.scale,
    pageNo: state.pageNo,
    pages: state.pages,
    zoomScale: state.zoomScale,
    shapeVisible: state.shapeVisible,
    stageSize: state.stageSize,
    setDimensions: state.setDimensions,
    setShapeVisible: state.setShapeVisible,
    setZoomScale: state.setZoomScale,
  }));
  const [image, imageStatus] = useImage(pages[pageNo].src);
  const [lastCenter, setLastCenter] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lastDist, setLastDist] = useState<number>(0);

  useEffect(() => {
    pages[pageNo].shapes.map((shape, index) =>
      setShapeVisible(index, shape.visible)
    );

    if (imageStatus === "loaded") {
      setDimensions(pages[pageNo].height, pages[pageNo].width, { x: 1, y: 1 });
    }
  }, [pages, pageNo]);

  const groupRef = useCallback(
    (group: LayerType) => {
      if (group === null) return;

      const stage = group.getStage();

      group.x(
        stage.width() / 2 - group.getClientRect().width / (zoomScale / 100) / 2
      );
      group.y(
        stage.height() / 2 -
          group.getClientRect().height / (zoomScale / 100) / 2
      );
      group.scale({
        x: scale.x * (zoomScale / 100),
        y: scale.y * (zoomScale / 100),
      });
      setZoomScale(100);
    },
    [pages, pageNo]
  );

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

  // Mouse zoom
  function onWheel(e: KonvaEventObject<WheelEvent>) {
    // e.evt.preventDefault();

    const stage = e.currentTarget.getStage() as StageType;

    const pointer = stage.getPointerPosition();

    if (pointer === null) return;

    var mousePointTo = {
      x: (pointer.x - e.currentTarget.x()) / zoomScale,
      y: (pointer.y - e.currentTarget.y()) / zoomScale,
    };

    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // for zooming on a trackpad
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    var newScale = direction > 0 ? zoomScale + 10 : zoomScale - 10;

    if (newScale >= 100 && newScale <= 200) {
      setZoomScale(newScale);

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      e.currentTarget.position(newPos);
    }
  }

  function onDragMove(e: KonvaEventObject<DragEvent>) {
    // e.evt.preventDefault();

    const stage = (e.target as StageType).getStage();
    const group = e.currentTarget;
    const box = group.getClientRect();

    const newBoxPos = { x: box.x, y: box.y };

    const limitX = box.width / 2;
    const limitY = box.height / 2;

    if (box.x < 0 - limitX) {
      // If left side of box is trying to going beyond left limit
      newBoxPos.x = 0 - limitX;
    }

    if (box.y < 0 - limitY) {
      newBoxPos.y = 0 - limitY;
    }

    if (box.x + box.width > stage.width() + limitX) {
      newBoxPos.x = stage.width() - box.width + limitX;
    }

    if (box.y + box.height > stage.height() + limitY) {
      newBoxPos.y = stage.height() - box.height + limitY;
    }

    group.x(newBoxPos.x);
    group.y(newBoxPos.y);
  }

  // Double tap to reset zoom
  function onDblTap(e: KonvaEventObject<Event>) {
    // e.evt.preventDefault();

    const group = e.currentTarget as LayerType;
    const stage = e.currentTarget.getStage() as StageType;

    if (zoomScale > 100) {
      group.x(
        stage.width() / 2 - group.getClientRect().width / (zoomScale / 100) / 2
      );
      group.y(
        stage.height() / 2 -
          group.getClientRect().height / (zoomScale / 100) / 2
      );
      group.scale({
        x: scale.x * (zoomScale / 100),
        y: scale.y * (zoomScale / 100),
      });
      setZoomScale(100);
    } else {
      group.x(stage.width() / 2 - group.getClientRect().width);
      group.y(stage.height() / 2 - group.getClientRect().height);
      group.scale({ x: scale.x * 2, y: scale.y * 2 });
      setZoomScale(200);
    }
  }

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
      height={stageSize.height}
      width={stageSize.width}
      style={{ alignItems: "center", justifyContent: "center" }}
      draggable={false}
    >
      <Layer
        // When loaded into the stage, layer is scaled to fit (implicitly)
        scale={{
          x: scale.x * (zoomScale / 100),
          y: scale.y * (zoomScale / 100),
        }}
        draggable={true}
        // Mouse (or trackpad) events
        onWheel={onWheel}
        onDragMove={onDragMove}
        onPointerDblClick={onDblTap}
        style={{ touchAction: "none" }}
        ref={groupRef}
      >
        <Image
          image={image}
          height={pages[pageNo].height}
          width={pages[pageNo].width}
        />

        {pages[pageNo].shapes.map((rect, i) => {
          return <Rect key={i} {...rect} visible={shapeVisible[i]} />;
        })}
      </Layer>
    </Stage>
  );
}
