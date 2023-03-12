import { ReactElement, useEffect, useRef, useState } from "react";
import { Group, Image, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";
import { PageObject } from "./Reader";

type PageProps = {
  page: PageObject;
};

export function Page({ page }: PageProps): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    height: page.height,
    width: page.width,
    scale: { x: 1, y: 1 },
  });

  useEffect(() => {
    function fitStageIntoParentContainer() {
      if (
        containerRef.current?.offsetHeight &&
        containerRef.current?.offsetWidth
      ) {
        setDimensions((prev) => {
          const scale = containerRef.current!.offsetHeight / prev.height;

          return {
            height: prev.height * scale,
            width: prev.width * scale,
            scale: { x: scale, y: scale },
          };
        });
      }
    }

    // Re-adjust stage dimensions on first render
    fitStageIntoParentContainer();

    window.addEventListener("resize", fitStageIntoParentContainer);

    return () => {
      window.removeEventListener("resize", fitStageIntoParentContainer);
    };
  }, []);

  const [image, imageStatus] = useImage(page.src);

  console.log(imageStatus);

  if (imageStatus === "loading") {
    //TODO 'Loading' overlay
    return (
      <Layer>
        <Text text="Loading" />
      </Layer>
    );
  }

  if (imageStatus === "failed") {
    //TODO 'Failed' overlay with 'reload' button
    return (
      <Layer>
        <Text text="Failed" />
      </Layer>
    );
  }

  return (
    <div
      id="container"
      style={{ height: "100vh", justifyContent: "center" }}
      ref={containerRef}
    >
      <Stage
        height={dimensions.height}
        width={dimensions.width}
        scale={dimensions.scale}
      >
        <Layer id="background" listening={false}>
          <Image
            image={image}
            height={dimensions.height}
            width={dimensions.width}
            scale={dimensions.scale}
            listening={false}
          />
        </Layer>

        <Layer id="shapes"></Layer>

        <Layer id="loadingOverlay" listening={false} />
      </Stage>
    </div>
  );
}
