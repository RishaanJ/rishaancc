import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"
import GodanReveal from "./GodanReveal"
import styles from "./godan.module.css"

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

const pecita = localFont({
  src: "./fonts/Pecita.otf",
  variable: "--font-pecita",
  display: "swap",
})

const SUPPORT_EMAIL = "rishaanjain188@gmail.com"
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=godan%20support`

export const metadata: Metadata = {
  title: "godan — make room for a book",
  description:
    "A quieter way to read on iPhone. Godan brings your book to you one word at a time, at your own pace.",
}

const QUESTIONS = [
  {
    q: "how do i add a book?",
    a: "open the library and tap add a book, then choose a file from your phone. it shows up in the list and stays there until you remove it.",
  },
  {
    q: "how do i change how fast it goes?",
    a: "the dial underneath the word. drag left to slow down, right to speed up. most people start around 300 words a minute and creep up from there — go faster than feels comfortable and you'll notice you've stopped taking anything in.",
  },
  {
    q: "one word at a time is too sparse for me.",
    a: "you can have it show a few words at a time instead. the setting sits at the bottom right of the reader, next to the play button.",
  },
  {
    q: "i lost my place in a book.",
    a: "you shouldn't have. godan remembers where you stopped in each book — open it again and press play. the page count under the reader tells you where you are.",
  },
  {
    q: "my book won't open — it says there's no readable text.",
    a: "the file is almost certainly a scan: photographs of pages rather than text. there are no words in it for godan to show, only pictures of words. a copy with real text in it will open straight away, and you can usually tell the difference by trying to select a sentence in any other reader.",
  },
  {
    q: "what does it cost?",
    a: "two books are free. after that it's a single payment of $2.99 that lifts the limit for good. it isn't a subscription and there's nothing else to buy.",
  },
  {
    q: "i paid, but the app is asking me to pay again.",
    a: "it shouldn't. open the unlock screen and tap restore a purchase — that asks apple what you already own and puts it back. it works on a new phone too, as long as you're signed in with the same apple account you bought it with. if it still won't come back, email me.",
  },
  {
    q: "a book won't open, or the app closed on its own.",
    a: "that's a bug and i'd like to know about it. email me with the name of the book and what you were doing when it happened, and i'll take a look.",
  },
  {
    q: "what happens to my books and my reading history?",
    a: "they stay on your phone. nothing is uploaded and there's no account to make. delete the app and it all goes with it.",
  },
]

function VideoSlot({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className={styles.videoSlot} role="img" aria-label={`${title}. Real-life video placeholder.`}>
      <div className={styles.videoSlotTop} aria-hidden="true">
        <span>GODAN / REAL-LIFE VIDEO</span>
        <span>{number} — 02</span>
      </div>
      <div className={styles.videoSlotCenter} aria-hidden="true">
        <span className={styles.playSymbol}>▶</span>
        <span className={styles.slotTitle}>{title}</span>
        <span className={styles.slotDescription}>{description}</span>
      </div>
      <span className={styles.videoSlotBottom} aria-hidden="true">FOOTAGE TO BE ADDED</span>
    </div>
  )
}

export default function GodanPage() {
  return (
    <main id="top" className={`${styles.page} ${instrumentSerif.variable} ${pecita.variable}`}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Godan navigation">
          <a href="#top" className={styles.navBrand} aria-label="Godan, back to top">Godan</a>
          <div className={styles.navLinks}>
            <a href="#idea">the idea</a>
            <a href="#note">a note</a>
            <a href="#questions">questions</a>
          </div>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="godan-title">
        <div className={styles.heroIcon}>
          <Image
            src="/godan-book-logo.png"
            alt=""
            width={378}
            height={382}
            priority
            className={styles.logoImage}
          />
        </div>
        <h1 id="godan-title" className={styles.wordmark}>godan</h1>
        <p className={styles.heroLine}>make room for a book.</p>
        <p className={styles.heroDescription}>
          One word at a time. At your own pace. For the moments you didn&apos;t think were long enough to read.
        </p>
        <div className={styles.comingSoon} aria-label="Godan for iPhone, coming soon">
          <svg className={styles.comingSoonIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          Coming soon <span className={styles.comingSoonDetail}>for iPhone</span>
        </div>
        <p className={styles.heroFootnote}>A little less page. A little more story.</p>
      </section>

      <GodanReveal className={styles.firstFilm}>
        <VideoSlot
          number="01"
          title="a book, anywhere"
          description="A real moment of reading on an iPhone will live here."
        />
      </GodanReveal>

      <section id="idea" className={styles.ideaSection} aria-labelledby="idea-title">
        <GodanReveal className={styles.ideaCopy}>
          <h2 id="idea-title">The book comes to you.</h2>
          <p>
            A queue. A train. Ten minutes before bed. Godan makes those little spaces feel like enough.
          </p>
          <p>
            The words stay in one place, so your eyes don&apos;t have to travel. Set a pace that feels right, pause whenever you like, and pick up exactly where you left off.
          </p>
          <p className={styles.ideaLast}>Just you and the next word.</p>
        </GodanReveal>
      </section>

      <GodanReveal className={styles.secondFilm}>
        <VideoSlot
          number="02"
          title="a moment to keep"
          description="A real-life look at the reader and its simple controls will live here."
        />
      </GodanReveal>

      <section id="note" className={styles.noteSection} aria-labelledby="note-title">
        <GodanReveal className={styles.noteInner}>
          <p className={styles.sectionLabel}>A NOTE FROM THE MAKER</p>
          <h2 id="note-title">Dear reader,</h2>
          <div className={styles.noteBody}>
            <p>
              Honestly, I&apos;ve always wanted to read more than I actually do. I have ADHD, my phone is always right there, and some days even opening a book feels like a big ask.
            </p>
            <p>
              So I made Godan for myself. One word at a time, at a pace I can set. I wanted it to feel easier to start, and easier to keep going when I only have a few minutes.
            </p>
            <p>I&apos;m not trying to race through books. I just want to spend more time with them. If Godan helps you do that too, that would mean a lot.</p>
            <p>Hope it helps,</p>
          </div>
          <p className={styles.signature}>Rishaan</p>
        </GodanReveal>
      </section>

      <section id="questions" className={styles.questionsSection} aria-labelledby="questions-title">
        <GodanReveal>
          <h2 id="questions-title">Good questions.</h2>
          <p className={styles.questionsIntro}>Everything you might want to know before opening your next book.</p>
          <div className={styles.questionsList}>
            {QUESTIONS.map(({ q, a }) => (
              <details key={q} className={styles.question}>
                <summary>{q}<span aria-hidden="true" className={styles.questionIcon}>+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </GodanReveal>
      </section>

      <footer className={styles.footer}>
        <GodanReveal>
          <div className={styles.footerIcon} aria-hidden="true">
            <Image src="/godan-book-logo.png" alt="" width={378} height={382} />
          </div>
          <h2>one more page?</h2>
          <p>Godan for iPhone is coming soon.</p>
          <span className={styles.footerStatus}>COMING SOON</span>
          <div className={styles.footerLinks}>
            <a href={MAILTO}>get in touch</a>
            <Link href="/godan/privacy">privacy</Link>
            <Link href="/">rishaan.cc</Link>
          </div>
        </GodanReveal>
      </footer>
    </main>
  )
}
