import {
  IconBrandGithub,
  IconChevronRight,
  IconDeviceMobileCheck,
  IconSortDescending2,
} from "@tabler/icons-react";
import Link from "next/link";
import { IconEyeOff } from "@tabler/icons-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-slate-900 h-full">
      <main id="content">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 h-screen flex items-center justify-center">
            <div className="space-y-8">
              <div className="max-w-3xl text-center mx-auto">
                <h1 className="block font-thin text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Read <b className="font-extrabold">manga</b> like {`you're `}
                  watching a <b className="font-extrabold">show</b>
                </h1>
              </div>

              <div className="max-w-3xl text-center mx-auto">
                <p className="text-lg text-gray-400">
                  MangaShow is a viewer that turns a static manga into a dynamic
                  reading experience, while solving some annoyances readers
                  face.
                </p>
              </div>

              <div className="text-center">
                <Link
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                  href="/read/1"
                >
                  Try out the beta version now!
                  <IconChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="relative p-6 md:p-16">
            <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-gray-200">
                  How MangaShow makes reading manga different
                </h2>

                <nav className="grid gap-4 mt-5 md:mt-10">
                  <button
                    type="button"
                    className="cursor-auto text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hover:bg-gray-700 active"
                    id="tabs-with-card-item-1"
                  >
                    <span className="flex">
                      <IconEyeOff size={36} color="white" />
                      <span className="grow ml-6">
                        <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Stay spoiler-free
                        </span>
                        <span className="block mt-1 text-gray-800 dark:text-gray-200">
                          Hide dialogues, panels or images that may spoil the
                          page content and ruin the build-up
                        </span>
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className="cursor-auto text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hover:bg-gray-700"
                  >
                    <span className="flex">
                      <IconSortDescending2 size={34} color="white" />
                      <span className="grow ml-6">
                        <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Never get lost or confused
                        </span>
                        <span className="block mt-1 text-gray-800 dark:text-gray-200">
                          Dialogues and panels revealed in order so that
                          everything makes sense
                          <p className="pt-2 text-sm font-thin">
                            * subjective to the {`chapter's`} show author
                          </p>
                        </span>
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className="cursor-auto text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hover:bg-gray-700"
                    id="tabs-with-card-item-3"
                  >
                    <span className="flex">
                      <IconDeviceMobileCheck size={26} color="white" />
                      <span className="grow ml-6">
                        <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Responsive design
                        </span>
                        <span className="block mt-1 text-gray-800 dark:text-gray-200">
                          Looks and works good on both desktop and mobile
                          <p className="pt-2 text-sm font-thin">
                            * Multi touch gestures on mobile coming soon!
                          </p>
                        </span>
                      </span>
                    </span>
                  </button>
                </nav>
              </div>

              <div className="lg:col-span-6">
                <div className="relative">
                  <div>
                    <Image
                      className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
                      src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=1220&q=80"
                      alt="Image Description"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
              <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"></div>
            </div>
          </div>
        </div>

        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center">
            <div>
              <a
                className="flex-none text-xl font-semibold text-black dark:text-white"
                href="#"
                aria-label="Brand"
              >
                MangaShow
              </a>
            </div>

            <div className="mt-3">
              <p className="text-gray-500">2022 Armani.DEV</p>
            </div>

            <div className="mt-3 space-x-2">
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="http://github.com/firzanarmani/mangashow"
              >
                <IconBrandGithub size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
