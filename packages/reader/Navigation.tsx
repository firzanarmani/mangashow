import { ReactElement, useEffect, useState } from "react";
import { useReaderContext } from "./context";
import {
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";

export function Navigation(): ReactElement {
  const {
    pageNo,
    pages,
    currentStep,
    shapeVisible,
    prevStep,
    nextStep,
    prevPage,
    nextPage,
    setCurrentStep,
    setShapeVisible,
    hideAllShapes,
  } = useReaderContext((state) => ({
    pageNo: state.pageNo,
    pages: state.pages,
    currentStep: state.currentStep,
    shapeVisible: state.shapeVisible,
    prevStep: state.prevStep,
    nextStep: state.nextStep,
    prevPage: state.prevPage,
    nextPage: state.nextPage,
    setCurrentStep: state.setCurrentStep,
    setShapeVisible: state.setShapeVisible,
    hideAllShapes: state.hideAllShapes,
  }));

  function unravelAll() {
    hideAllShapes();
    setCurrentStep(pages[pageNo].shapeOrder.length);
  }

  function handleClickPrevPage() {
    if (pageNo > 0) {
      prevPage();
      setCurrentStep(0);
    }
  }

  function handleClickNextPage() {
    // If not complete, then unravel all before going to next page
    if (currentStep < pages[pageNo].shapeOrder.length) {
      unravelAll();
    } else if (pageNo < pages.length - 1) {
      nextPage();
      setCurrentStep(0);
    }
  }

  function handleClickPrevStep() {
    if (pages[pageNo].shapeOrder.length > 0 && currentStep >= 0) {
      const prevShape = pages[pageNo].shapeOrder[currentStep - 1];
      setShapeVisible(prevShape, true);
      prevStep();
    }
  }

  function handleClickNextStep() {
    if (
      pages[pageNo].shapeOrder.length > 0 &&
      currentStep <= pages[pageNo].shapeOrder.length
    ) {
      const prevShape = pages[pageNo].shapeOrder[currentStep];
      setShapeVisible(prevShape, false);
      nextStep();
    }
  }

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      e.preventDefault();

      if (e.key === "ArrowDown") {
        handleClickNextPage();
      } else if (e.key === "ArrowUp") {
        handleClickPrevPage();
      } else if (e.key === "ArrowRight") {
        pages[pageNo].shapeOrder.length === 0 ||
        currentStep === pages[pageNo].shapeOrder.length
          ? handleClickNextPage()
          : handleClickNextStep();
      } else if (e.key === "ArrowLeft") {
        pages[pageNo].shapeOrder.length === 0 || currentStep === 0
          ? handleClickPrevPage()
          : handleClickPrevStep();
      }
    }
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [
    pages,
    pageNo,
    currentStep,
    handleClickPrevPage,
    handleClickNextPage,
    handleClickPrevStep,
    handleClickNextStep,
  ]);

  return (
    <>
      <div id="page-progress-bar" className="progress-bar-container">
        <div
          id="progress-bar-foreground"
          className="progress-bar progress-bar-page"
          style={{
            width:
              pages[pageNo].shapeOrder.length === 0
                ? "100%"
                : (currentStep / pages[pageNo].shapeOrder.length) * 100 + "%",
          }}
        ></div>
        <div
          id="progress-bar-background"
          className="progress-bar progress-bar-background"
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "4rem",
          padding: "0.5rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            gap: "0.5rem",
          }}
        >
          <button
            id="prevStep"
            style={{
              display: "flex",
              height: "100%",
              width: "4rem",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.5rem",
            }}
            onClick={
              pages[pageNo].shapeOrder.length === 0 || currentStep === 0
                ? handleClickPrevPage
                : handleClickPrevStep
            }
            disabled={pageNo === 0}
          >
            <IconChevronLeft />
          </button>
          <button
            id="prevPage"
            style={{
              display: "flex",
              height: "100%",
              width: "3rem",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.5rem",
            }}
            onClick={handleClickPrevPage}
            disabled={pageNo === 0}
          >
            <IconChevronsLeft />
          </button>
        </div>
        <div style={{ color: "white" }}>{`${pageNo + 1} / ${
          pages.length
        }`}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            gap: "0.5rem",
          }}
        >
          <button
            id="nextPage"
            style={{
              display: "flex",
              height: "100%",
              width: "3rem",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.5rem",
            }}
            onClick={handleClickNextPage}
            disabled={pageNo === pages.length - 1}
          >
            <IconChevronsRight />
          </button>
          <button
            id="nextStep"
            style={{
              display: "flex",
              height: "100%",
              width: "4rem",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.5rem",
            }}
            onClick={
              pages[pageNo].shapeOrder.length === 0 ||
              currentStep === pages[pageNo].shapeOrder.length
                ? handleClickNextPage
                : handleClickNextStep
            }
            disabled={
              pageNo === pages.length - 1 &&
              (pages[pageNo].shapeOrder.length === 0 ||
                currentStep === pages[pageNo].shapeOrder.length)
            }
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}
