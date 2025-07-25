import { isTauriAndroid } from "@/lib/platform";
import { ThemeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="bg-background text-foreground border-border sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="flex w-full items-center justify-between">
          <div className="mr-4">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary size-8"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8h.01" />
                <path d="M11 21h-5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l2 2" />
                <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
              </svg>
              <span className="text-foreground text-lg font-bold sm:inline-block">
                Image Compressor
              </span>
            </a>
          </div>
          {!isTauriAndroid() && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
};

export default Header;
