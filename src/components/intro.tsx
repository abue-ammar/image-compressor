const Intro = () => {
  return (
    <section className="animate-fadeIn animate-delay-100">
      <div className="container mx-auto py-8 2xl:max-w-[1400px]">
        {/* Announcement Banner */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
            href="https://github.com/abue-ammar/image-compressor/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-base">🎉</span>
            Available on all platforms
            <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-medium">
              <svg
                className="h-4 w-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>
        {/* End Announcement Banner */}
        {/* Title */}
        <div className="mx-auto mt-4 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Free & Open Source Image Compressor
          </h1>
        </div>
        {/* End Title */}
        <div className="mx-auto mt-4 max-w-3xl text-center">
          <p className="text-muted-foreground text-lg !leading-6">
            Compress images instantly and securely—right on your device. No
            uploads, no limits, no APIs. Works offline and keeps your files
            private.
          </p>
        </div>
        {/* Buttons */}
        {/* <div className="mt-4 flex justify-center">
          <a
            href="https://www.producthunt.com/posts/image-compressor-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-image-compressor-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=866606&theme=light"
              alt="Image Compressor - Compress images fast, securely, and for free—no API call | Product Hunt"
              style={{ width: "187.5px", height: "40.5px" }}
            />
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Intro;
