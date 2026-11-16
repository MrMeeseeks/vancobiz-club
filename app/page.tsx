/* eslint-disable @next/next/no-img-element -- static export; logo used unchanged as a plain image */
import members from "@/data/members.json";
import GoldDefs from "@/components/member-card/GoldDefs";
import MemberCard, { type Member } from "@/components/member-card/MemberCard";
import CardEffects from "@/components/member-card/CardEffects";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const MAIN_SITE = "https://mrmeeseeks.github.io/vancobiz/";
const CONTACT_EMAIL = "info@vancobiz.com";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Members", href: "#members", current: true },
  { label: "Login / Register", href: "#" }, // inert in the prototype
];

export default function MembersPage() {
  const list = members as Member[];

  return (
    <>
      <GoldDefs />
      <CardEffects />

      <header id="top" className="sticky top-0 z-40 border-b border-gold-light/15 bg-obsidian/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="shrink-0" aria-label="VancoBiz Club home">
            <img src={`${BASE}/vbc-logo.png`} alt="VancoBiz Club" width={64} height={64} className="size-14 object-contain sm:size-16" />
          </a>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1 text-sm sm:gap-2">
              {NAV.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-current={l.current ? "page" : undefined}
                    className={`rounded-full px-3 py-2 transition-colors sm:px-4 ${
                      l.current ? "text-gold-light" : "text-zinc-300 hover:text-offwhite"
                    } ${l.label.startsWith("Login") ? "border border-gold-light/30" : ""}`}
                  >
                    {l.label.startsWith("Login") ? (
                      <>
                        Login<span className="hidden sm:inline"> / Register</span>
                      </>
                    ) : (
                      l.label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero band */}
        <section aria-labelledby="page-title" className="relative overflow-hidden bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,color-mix(in_srgb,var(--gold)_22%,transparent),transparent_70%)]"
          />
          {/* Engraving watermark, reusing the card patterns */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="-320 -200 640 400"
            className="pointer-events-none absolute inset-0 m-auto h-full w-full max-w-5xl opacity-40 [mask-image:radial-gradient(closest-side,black_35%,transparent)]"
          >
            <use href="#vbc-rays" />
            <use href="#vbc-guilloche" />
          </svg>
          <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:py-28">
            <p className="eyebrow">VancoBiz Club</p>
            <h1 id="page-title" className="display text-foil mt-4 text-[clamp(2.75rem,9vw,6rem)] leading-none">
              Members
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-300">
              Connect, collaborate, grow locally. Meet the {list.length} businesses that make up the Club.
            </p>
          </div>
          <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </section>

        {/* Member grid */}
        <section id="members" aria-labelledby="members-title" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 id="members-title" className="sr-only">
            Member directory
          </h2>
          <ul className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <li key={m.name} className="h-full">
                <MemberCard member={m} number={i + 1} />
              </li>
            ))}
          </ul>
        </section>

        {/* Join */}
        <section aria-labelledby="join-title" className="px-5 pb-24">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-gold-light/30 bg-surface px-6 py-14 text-center sm:px-12">
            <svg aria-hidden="true" focusable="false" className="absolute inset-x-0 top-0 h-3 w-full">
              <rect width="100%" height="12" fill="url(#vbc-border-motif)" />
            </svg>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_120%,color-mix(in_srgb,var(--gold)_25%,transparent),transparent_70%)]"
            />
            <div className="relative">
              <h2 id="join-title" className="display text-[clamp(1.75rem,5vw,3rem)] leading-tight">
                Interested in joining <span className="text-foil">the Club?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-300">
                Get your business on the members wall, meet local founders and show your brand at Club events.
              </p>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Joining the VancoBiz Club")}`} className="btn-gold mt-8">
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gold-light/15 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={`${BASE}/vbc-logo.png`} alt="" width={40} height={40} className="size-10 object-contain" />
            <span>© 2026 VancoBiz Club · North Vancouver, BC</span>
          </div>
          <a href={MAIN_SITE} className="text-gold-light hover:underline">
            Part of VancoBiz →
          </a>
        </div>
      </footer>
    </>
  );
}
