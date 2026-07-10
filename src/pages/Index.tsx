const NavHeader = () => (
  <header className="oh-container border-b border-line">
    <div className="flex items-center justify-between py-6">
      <a href="/" className="font-display text-[1.3rem] font-medium leading-none text-paper">
        Open Hand
      </a>
      <nav className="flex items-center gap-7 text-[0.85rem] text-muted-ink">
        <a href="#about" className="transition-colors hover:text-gold">About</a>
        <a href="#writing" className="transition-colors hover:text-gold">Writing</a>
        <a href="#support" className="transition-colors hover:text-gold">Support</a>
      </nav>
    </div>
  </header>
);

const HeroIllustration = () => (
  <svg
    viewBox="0 0 220 60"
    className="mt-10 h-[52px] w-[220px] text-gold motion-safe:animate-oh-rise"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M8 44 C 40 20, 70 20, 96 40 S 158 60, 196 24" />
    <path d="M196 24 L 210 18" />
    <path d="M196 24 L 202 36" />
  </svg>
);

const Hero = () => (
  <section className="oh-container pt-[96px] pb-[72px] md:pt-[96px] md:pb-[72px] max-md:pt-[64px] max-md:pb-[48px]">
    <span className="oh-label">A field notebook</span>
    <h1 className="mt-6 font-display text-[2.1rem] md:text-[2.7rem] font-medium leading-[1.15] text-paper">
      Plan diligently, <em className="not-italic text-gold" style={{ fontStyle: 'italic' }}>hold</em> it loosely.
    </h1>
    <p className="mt-5 text-[1.05rem] leading-[1.6] text-muted-ink">
      Essays and notes from a software engineer and writer — on AI systems, patterns in markets and code, and the quieter decisions of a life.
    </p>
    <HeroIllustration />
  </section>
);

const About = () => (
  <section id="about" className="oh-hairline">
    <div className="oh-container py-[64px]">
      <span className="oh-label">About</span>
      <p className="mt-6 text-[1.02rem] leading-[1.6] text-paper">
        I work by day in AI systems and study patterns by habit — in code, in markets, in the small
        decisions that compound into a life. This page is a slow room. I publish when the thinking is
        done, not when the week is out.
      </p>
      <p className="mt-4 text-[1.02rem] leading-[1.6] text-muted-ink">
        Everything here is written by hand. No newsletter cadence, no takes for their own sake — just
        pieces held long enough to be worth reading twice.
      </p>
    </div>
  </section>
);

const Essay = () => (
  <section id="writing" className="oh-hairline">
    <div className="oh-container py-[64px]">
      <span className="oh-label">The featured piece</span>
      <h2 className="mt-6 font-display text-[1.9rem] font-medium leading-[1.15] text-paper">
        On planning diligently, and holding it loosely
      </h2>
      <p className="mt-3 text-[0.85rem] leading-[1.4] text-muted-ink">
        Essay · 12 min · Published this spring
      </p>

      <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.6] text-paper">
        <p className="oh-dropcap">
          There is a way of working I have been trying to learn for a long time, and it is neither
          the discipline of the planner nor the surrender of the mystic — it is both, held at the
          same time, in the same hand. Plan the week in detail on Sunday night. Wake Monday willing
          to throw the plan out by noon. Most of the good work I have ever done sits in the small
          gap between those two sentences.
        </p>
        <p>
          The engineers I trust most are ruthless with their plans and gentle with their outcomes.
          They know the difference between the ledger and the territory. They will spend an hour
          on a diagram that a meeting could kill, and then let the meeting kill it without
          flinching. The plan was not the point. The clarity of thinking that produced the plan is
          the point, and that clarity survives its object.
        </p>
        <p>
          Markets teach the same thing, more expensively. So does raising a child, from what I am
          told. So does writing anything at length. You commit fully to a shape, and then, when the
          shape asks to become something else, you let it.
        </p>
        <p className="italic text-gold">
          Open hand. Open week. Open work.
        </p>
      </div>
    </div>
  </section>
);

const Support = () => (
  <section id="support" className="oh-hairline">
    <div className="oh-container py-[64px]">
      <span className="oh-label">Support this writing</span>
      <div className="mt-6 border border-line bg-ink-2 p-8">
        <h3 className="font-display text-[1.3rem] font-medium leading-[1.2] text-paper">
          Keep the room quiet
        </h3>
        <p className="mt-3 text-[1.02rem] leading-[1.6] text-muted-ink">
          There is no paywall and no newsletter. If a piece here was worth your morning, a small
          contribution keeps the page ad-free and the writing unhurried.
        </p>
        <a href="#" className="oh-btn-primary mt-6">
          Leave a tip
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <div className="oh-container pt-10 pb-[60px]">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.85rem] text-muted-ink">
        <p>© {new Date().getFullYear()} Open Hand. Written slowly.</p>
        <a href="mailto:hello@openhand.page" className="transition-colors hover:text-gold">
          hello@openhand.page
        </a>
      </div>
    </div>
  </footer>
);

const Index = () => {
  return (
    <>
      <div className="oh-frame" aria-hidden="true"><span /></div>
      <main className="min-h-screen bg-ink text-paper">
        <NavHeader />
        <Hero />
        <About />
        <Essay />
        <Support />
        <Footer />
      </main>
    </>
  );
};

export default Index;
