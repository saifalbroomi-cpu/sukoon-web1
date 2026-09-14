export default function Home() {
  return (
    <div className="animate-page relative flex min-h-dvh flex-col overflow-hidden bg-milk text-ink">
      <div className="noise" aria-hidden="true" />

      {/* Soft ambient light — barely there */}
      <div
        className="glow-orb pointer-events-none absolute left-1/2 top-[38%] h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream blur-[80px]"
        aria-hidden="true"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="animate-logo font-display text-[clamp(3.25rem,14vw,8.5rem)] font-light leading-none tracking-[0.28em] text-ink sm:tracking-[0.36em]">
            <span className="inline-block pl-[0.28em] sm:pl-[0.36em]">
              SU&nbsp;KOON
            </span>
          </h1>

          <p className="animate-soon mt-10 font-sans text-[0.68rem] font-normal uppercase tracking-[0.55em] text-brown sm:mt-12 sm:text-[0.72rem] sm:tracking-[0.62em]">
            Coming Soon
          </p>

          <p className="animate-tagline mt-6 max-w-[16rem] font-display text-[1.05rem] font-light italic leading-relaxed tracking-wide text-taupe sm:mt-7 sm:max-w-none sm:text-[1.15rem]">
            Something worth waiting for.
          </p>
        </div>
      </main>

      <footer className="animate-instagram relative z-10 pb-8 pt-4 sm:pb-10">
        <a
          href="https://www.instagram.com/wearsukoon.om/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex w-fit items-baseline gap-2.5 font-sans text-[0.65rem] font-light uppercase tracking-[0.28em] text-taupe transition-colors duration-700 ease-out hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown"
          aria-label="Sukoon on Instagram, @wearsukoon.om"
        >
          <span className="tracking-[0.32em]">Instagram</span>
          <span
            className="h-px w-4 bg-sand transition-all duration-700 ease-out group-hover:w-7 group-hover:bg-brown"
            aria-hidden="true"
          />
          <span className="normal-case tracking-[0.12em] text-brown transition-colors duration-700 group-hover:text-ink">
            @wearsukoon.om
          </span>
        </a>
      </footer>
    </div>
  );
}
