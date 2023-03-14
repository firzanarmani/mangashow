import {
  type ReactElement,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Layer, Image, Stage, Rect } from "react-konva";
import useImage from "use-image";
import "./styles.css";

//TODO Mousewheel to zoom functionality - https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html`
export type Shape = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  name: string;
  visible: boolean;
  id: string;
};

export type PageObject = {
  pageNo: number;
  src: string;
  alt: string;
  height: number;
  width: number;
  shapes: Shape[];
  shapeOrder: number[];
};

export type ReaderObject = {
  series_title: string;
  chapter_number: number;
  source: string;
  pages: PageObject[];
};

export type ReaderProps = {
  readerObject: ReaderObject;
  initialCurrentPage?: number;
  fit?: "fullWidth" | "fullHeight";
};

export function Reader({
  readerObject,
  initialCurrentPage = 0,
  fit = "fullHeight",
}: ReaderProps): ReactElement {
  function fitStageIntoParentContainer(
    container: HTMLDivElement,
    page: PageObject
  ) {
    if (container.offsetHeight && container.offsetWidth) {
      setDimensions(() => {
        const scale =
          fit === "fullHeight"
            ? container.offsetHeight / page.height
            : container.offsetWidth / page.width;

        return {
          height: page.height * scale,
          width: page.width * scale,
          scale: { x: scale, y: scale },
        };
      });
    }
  }

  function handleClickPrevPage() {
    // TODO Page boundary error handling
    setCurrentPageNo((prev) => prev - 1);
  }

  function handleClickNextPage() {
    // TODO Page boundary error handling
    setCurrentPageNo((prev) => prev + 1);
  }

  function handleClickPrevStep() {
    setCurrentStep((prevStep) => {
      const prevShape =
        readerObject.pages[currentPageNo].shapeOrder[prevStep - 1];
      setShapeVisible((prev) => {
        const newArr = prev.slice();
        prev[prevShape] = !prev[prevShape];
        return newArr;
      });
      return prevStep - 1;
    });
  }

  function handleClickNextStep() {
    setCurrentStep((prevStep) => {
      const prevShape = readerObject.pages[currentPageNo].shapeOrder[prevStep];
      setShapeVisible((prev) => {
        const newArr = prev.slice();
        prev[prevShape] = !prev[prevShape];
        return newArr;
      });

      return prevStep + 1;
    });
  }

  // TODO Add reload capability to failed image load
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    scale: { x: 1, y: 1 },
  });
  const [currentPageNo, setCurrentPageNo] =
    useState<number>(initialCurrentPage);
  const [shapeVisible, setShapeVisible] = useState<boolean[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [image, imageStatus] = useImage(readerObject.pages[currentPageNo].src);

  useEffect(() => {
    // Re-adjust stage dimensions on first render
    fitStageIntoParentContainer(
      containerRef.current!,
      readerObject.pages[currentPageNo]
    );

    window.addEventListener("resize", () =>
      fitStageIntoParentContainer(
        containerRef.current!,
        readerObject.pages[currentPageNo]
      )
    );

    return () => {
      window.removeEventListener("resize", () =>
        fitStageIntoParentContainer(
          containerRef.current!,
          readerObject.pages[currentPageNo]
        )
      );
    };
  }, [fit]);

  useEffect(() => {
    // ? Is the intial page's shapes set? Test by setting reader's initialPage to page 2
    setShapeVisible(
      readerObject.pages[currentPageNo].shapes.map((shape) => shape.visible)
    );

    if (imageStatus === "loaded") {
      setDimensions({
        height: readerObject.pages[currentPageNo].height,
        width: readerObject.pages[currentPageNo].width,
        scale: { x: 1, y: 1 },
      });
    }

    fitStageIntoParentContainer(
      containerRef.current!,
      readerObject.pages[currentPageNo]
    );
  }, [currentPageNo]);

  const ReaderDiv = () => {
    if (imageStatus === "loading") {
      return <div style={{ color: "white" }}>Loading page</div>;
    }

    if (imageStatus === "failed") {
      return <div style={{ color: "white" }}>Unable to load page</div>;
    }

    return (
      <Stage
        height={dimensions.height}
        width={dimensions.width}
        scale={dimensions.scale}
        style={{ alignItems: "center" }}
      >
        <Layer id="background" listening={false}>
          <Image
            image={image}
            height={readerObject.pages[currentPageNo].height}
            width={readerObject.pages[currentPageNo].width}
            listening={false}
          />
        </Layer>

        <Layer id="shapes">
          {readerObject.pages[currentPageNo].shapes.map((rect, i) => {
            return <Rect key={i} {...rect} visible={shapeVisible[i]} />;
          })}
        </Layer>

        <Layer id="loadingOverlay" listening={false} />
      </Stage>
    );
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div id="controls" className="overlay-controls">
        <div className="container-controls controls-previous">
          <button
            id="previousPage"
            className="btn-controls btn-page"
            onClick={handleClickPrevPage}
            disabled={currentPageNo === 0}
          >
            Previous Page
          </button>
          <button
            id="previousStep"
            className="btn-controls btn-step"
            onClick={handleClickPrevStep}
            disabled={
              readerObject.pages[currentPageNo].shapes.length === 0 ||
              currentStep === 0
            }
          >
            Previous Step
          </button>
        </div>
        <div className="container-controls controls-next">
          <button
            id="nextPage"
            className="btn-controls btn-page"
            onClick={handleClickNextPage}
            disabled={currentPageNo === readerObject.pages.length - 1}
          >
            Next Page
          </button>
          <button
            id="nextStep"
            className="btn-controls btn-step"
            onClick={handleClickNextStep}
            disabled={
              readerObject.pages[currentPageNo].shapes.length === 0 ||
              currentStep === readerObject.pages[currentPageNo].shapes.length
            }
          >
            Next Step
          </button>
        </div>
      </div>
      <div
        id="container"
        style={{
          height: `${fit === "fullHeight" ? "100%" : ""}`,
          width: `${fit === "fullWidth" ? "100%" : ""}`,
          display: "flex",
          justifyContent: "center",
          alignContent: `${fit === "fullWidth" ? "start" : ""}`,
        }}
        ref={containerRef}
      >
        <ReaderDiv />
      </div>
    </div>
  );
}
