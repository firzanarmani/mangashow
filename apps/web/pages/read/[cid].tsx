import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Header } from "reader/Header";
import { Navigation } from "reader/Navigation";
import { ReaderProvider } from "reader/context";
import { PageObject, ReaderObject } from "reader/types";
import { useRouter } from "next/router";
import { Database } from "../../types/supabase";
import { supabase } from "../../lib/supabaseClient";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function Read({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  // Fix from https://github.com/konvajs/react-konva/issues/588
  const Reader = dynamic(
    () => import("reader/Reader").then((module) => module.Reader),
    { ssr: false }
  );

  const router = useRouter();
  const { cid } = router.query;

  return (
    <ReaderProvider
      series={data.series_title}
      chapterNumber={data.chapter_number}
      pages={data.pages}
      pageNo={0}
    >
      <div id="page-container" className="h-[100dvh] bg-black flex flex-col">
        <div className="w-full flex-none">
          <Header />
        </div>
        <div className="w-full grow">
          <Reader />
        </div>
        <div className="w-full flex-none">
          <Navigation />
        </div>
      </div>
    </ReaderProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: ReaderObject;
}> = async (context: GetServerSidePropsContext) => {
  const urlParams = context.params;

  if (urlParams === undefined) {
    return { notFound: true };
  }

  const { cid } = urlParams;

  if (cid === undefined || typeof cid !== "string") {
    return { notFound: true };
  }

  type ChapterShowsType = Database["public"]["Tables"]["ChapterShows"]["Row"];

  const { data } = await supabase
    .from("ChapterShows")
    .select("*, Series(title), Chapters(chapter_no)")
    .eq("id", cid)
    .limit(1)
    .single<
      ChapterShowsType & {
        Series: { title: string };
      } & {
        Chapters: { chapter_no: number };
      }
    >();

  if (data === null) {
    return { notFound: true };
  }

  return {
    props: {
      data: {
        series_title: data.Series.title,
        chapter_number: data.Chapters.chapter_no,
        source: "TCB Scans",
        pages: data.shapes as PageObject[],
      },
    },
  };
};
