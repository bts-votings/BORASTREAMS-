/* ==========================================================
   BoraStreams — Created by @bts_votings on YT
   Do not remove this credit.
   ========================================================== */
import React, { useState, useEffect, useMemo } from "react";
import {
  Home, Music, Disc3, Link2, BookOpen, Target, Timer, ListChecks,
  Users, BarChart3, Search, Sun, Moon, Heart, Play, ChevronRight,
  Youtube, Radio, TrendingUp, Award, Menu, X, CheckCircle2, Circle,
  Calendar, Newspaper
} from "lucide-react";

/* ---------------------------------- BRAND ---------------------------------- */
// Uploaded BoraStreams logo, embedded as a data URI so it always renders.
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAADFCAYAAAD68QZDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAL9JSURBVHhChb"; // NOTE: paste your full logo base64 string here — see message below

/* ---------------------------------- DATA ---------------------------------- */

const MEMBERS = [
  { id: "rm", name: "RM", full: "Kim Namjoon", role: "Leader, Rapper", color: "#9B7FE8",
    bio: "Leader and main rapper, known for introspective lyricism and solo work spanning hip-hop to alt-rock." },
  { id: "jin", name: "Jin", full: "Kim Seokjin", role: "Vocalist", color: "#E8B454",
    bio: "Vocalist known for warm ballads and a run of solo singles including 'The Astronaut.'" },
  { id: "suga", name: "SUGA", full: "Min Yoongi", role: "Rapper, Producer", color: "#6FA8D8",
    bio: "Rapper-producer behind Agust D, blending genre-defying production with sharp, personal writing." },
  { id: "jhope", name: "j-hope", full: "Jung Hoseok", role: "Rapper, Dancer", color: "#5FBF8F",
    bio: "Rapper and lead dancer whose solo releases lean into funk, dance, and high-energy performance." },
  { id: "jimin", name: "Jimin", full: "Park Jimin", role: "Vocalist, Dancer", color: "#D97FA8",
    bio: "Lead vocalist and dancer with chart-topping solo singles built around fluid vocals and movement." },
  { id: "v", name: "V", full: "Kim Taehyung", role: "Vocalist", color: "#C79A5B",
    bio: "Vocalist known for a distinct low register, applied across R&B, jazz-tinged, and cinematic solo work." },
  { id: "jk", name: "Jung Kook", full: "Jeon Jungkook", role: "Vocalist, Maknae", color: "#7FA8E8",
    bio: "Main vocalist and the group's youngest member, with global pop crossovers like 'Seven' and 'Standing Next to You.'" },
];

const SONGS = [
  { id: 1, title: "Dynamite", artist: "BTS", category: "Group", album: "BE (Deluxe Edition)", year: 2020 },
  { id: 2, title: "Butter", artist: "BTS", category: "Group", album: "Butter", year: 2021 },
  { id: 3, title: "Spring Day", artist: "BTS", category: "Group", album: "You Never Walk Alone", year: 2017 },
  { id: 4, title: "Black Swan", artist: "BTS", category: "Group", album: "Map of the Soul: 7", year: 2020 },
  { id: 5, title: "Seven", artist: "Jung Kook", category: "Solo", album: "Golden", year: 2023 },
  { id: 6, title: "Standing Next to You", artist: "Jung Kook", category: "Solo", album: "Golden", year: 2023 },
  { id: 7, title: "Like Crazy", artist: "Jimin", category: "Solo", album: "FACE", year: 2023 },
  { id: 8, title: "Set Me Free Pt.2", artist: "Jimin", category: "Solo", album: "FACE", year: 2023 },
  { id: 9, title: "Daechwita", artist: "Agust D (SUGA)", category: "Solo", album: "D-2", year: 2020 },
  { id: 10, title: "Haegeum", artist: "Agust D (SUGA)", category: "Solo", album: "D-Day", year: 2023 },
  { id: 11, title: "Chicken Noodle Soup", artist: "j-hope", category: "Solo", album: "Hope World", year: 2019 },
  { id: 12, title: "on the street", artist: "j-hope", category: "Solo", album: "HOPE ON THE STREET", year: 2024 },
  { id: 13, title: "Christmas Love", artist: "V", category: "Solo", album: "Layover", year: 2023 },
  { id: 14, title: "Rainy Days", artist: "V", category: "Solo", album: "Layover", year: 2023 },
  { id: 15, title: "The Astronaut", artist: "Jin", category: "Solo", album: "The Astronaut", year: 2022 },
  { id: 16, title: "Running Wild", artist: "Jin", category: "Solo", album: "Happy", year: 2024 },
  { id: 17, title: "Wild Flower, Pt.2", artist: "RM", category: "Solo", album: "Right Place, Wrong Person", year: 2024 },
  { id: 18, title: "Come Back to Me", artist: "RM", category: "Solo", album: "Indigo", year: 2022 },
  { id: 19, title: "Bird", artist: "RM", category: "Solo", album: "Indigo", year: 2022 },
  { id: 20, title: "Stay Alive", artist: "Jung Kook (feat. BTS)", category: "OST", album: "7FATES: CHAKHO", year: 2022 },
  { id: 21, title: "Film Out", artist: "BTS", category: "Japanese", album: "Map of the Soul: 7 ~The Journey~", year: 2021 },
  { id: 22, title: "Stay Gold", artist: "BTS", category: "Japanese", album: "MAP OF THE SOUL: 7 ~ THE JOURNEY ~", year: 2020 },
  { id: 23, title: "Bad Decisions", artist: "BTS, Benny Blanco, Snoop Dogg", category: "Group", album: "Proof", year: 2022 },
  { id: 24, title: "Yet To Come", artist: "BTS", category: "Group", album: "Proof", year: 2022 },
];

const ALBUMS = [
  { id: 1, title: "Proof", type: "Anthology", date: "2022-06-10", tracks: 35 },
  { id: 2, title: "BE (Deluxe Edition)", type: "Studio", date: "2020-11-20", tracks: 8 },
  { id: 3, title: "Map of the Soul: 7", type: "Studio", date: "2020-02-21", tracks: 20 },
  { id: 4, title: "Golden", type: "Solo — Jung Kook", date: "2023-11-03", tracks: 11 },
  { id: 5, title: "FACE", type: "Solo — Jimin", date: "2023-03-24", tracks: 7 },
  { id: 6, title: "D-Day", type: "Solo — Agust D", date: "2023-04-21", tracks: 10 },
  { id: 7, title: "Indigo", type: "Solo — RM", date: "2022-12-02", tracks: 10 },
  { id: 8, title: "Layover", type: "Solo — V", date: "2023-09-08", tracks: 6 },
];

const PLATFORMS = [
  { id: "spotify", name: "Spotify", note: "Streams count most from official playlists or the artist page — avoid muting or skipping before 30s.", color: "#5FBF6B" },
  { id: "apple", name: "Apple Music", note: "Play from the album view rather than a shuffled personal playlist for cleaner attribution.", color: "#E85B7A" },
  { id: "youtube", name: "YouTube", note: "Watch on the official channel upload, keep the tab active, and avoid ad-blockers on music videos.", color: "#E85B4B" },
  { id: "melon", name: "Melon", note: "Requires a Korean IP/account context for full chart weighting; check current guide notes before a party.", color: "#79D45C" },
];

const MILESTONES = [
  { id: 1, title: "'Dynamite' — YouTube Views", current: 1.82, target: 2.0, unit: "B" },
  { id: 2, title: "'Seven' — Spotify Streams", current: 1.65, target: 2.0, unit: "B" },
  { id: 3, title: "'Butter' — 100M Certified Units", current: 92, target: 100, unit: "M" },
  { id: 4, title: "BTS Spotify Monthly Listeners", current: 24.3, target: 30, unit: "M" },
];

const CHARTS = [
  { platform: "Billboard Hot 100", entries: [
    { rank: 4, title: "Seven", artist: "Jung Kook" },
    { rank: 18, title: "Standing Next to You", artist: "Jung Kook" },
  ]},
  { platform: "Spotify Global Top 200", entries: [
    { rank: 12, title: "Seven", artist: "Jung Kook" },
    { rank: 47, title: "Like Crazy", artist: "Jimin" },
  ]},
  { platform: "YouTube Music Trending", entries: [
    { rank: 2, title: "on the street", artist: "j-hope" },
    { rank: 9, title: "Wild Flower, Pt.2", artist: "RM" },
  ]},
];

const MISSIONS_TEMPLATE = [
  { id: 1, text: "Stream 3 title tracks on Spotify from the official playlist" },
  { id: 2, text: "Watch today's featured MV on YouTube start to finish" },
  { id: 3, text: "Add a solo track to your Apple Music library" },
  { id: 4, text: "Share today's streaming guide with one ARMY friend" },
  { id: 5, text: "Vote or engage on today's official chart platform" },
];

const NEWS = [
  { id: 1, tag: "Comeback", title: "New single teaser drops this week", date: "Aug 1, 2026" },
  { id: 2, tag: "Milestone", title: "'Dynamite' closes in on 1.9B views", date: "Jul 29, 2026" },
  { id: 3, tag: "Streaming", title: "Updated Melon streaming guide posted", date: "Jul 24, 2026" },
];

/* --------------------------------- HELPERS --------------------------------- */

function useCountdown(target) {
  const [left, setLeft] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const clamped = Math.max(left, 0);
  const d = Math.floor(clamped / 86400000);
  const h = Math.floor((clamped % 86400000) / 3600000);
  const m = Math.floor((clamped % 3600000) / 60000);
  const s = Math.floor((clamped % 60000) / 1000);
  return { d, h, m, s };
}

function MemberAvatar({ member, size = 44 }) {
  const initials = member.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${member.color}, ${member.color}99)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "2px solid var(--surface)", boxShadow: `0 0 0 2px ${member.color}55`,
    }}>
      <span className="display" style={{ color: "#fff", fontSize: size * 0.38, letterSpacing: "0.02em" }}>{initials}</span>
    </div>
  );
}

function EqBars({ size = 14, active = true, color }) {
  const bars = [0.4, 0.9, 0.6, 1, 0.5];
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: size }}>
      {bars.map((b, i) => (
        <span key={i} style={{
          width: Math.max(2, size / 7),
          height: `${b * 100}%`,
          background: color || "var(--accent)",
          borderRadius: 1,
          animation: active ? `eqPulse 1s ease-in-out ${i * 0.12}s infinite alternate` : "none",
        }} />
      ))}
    </span>
  );
}

/* ---------------------------------- APP ---------------------------------- */

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "songs", label: "Song Library", icon: Music },
  { id: "albums", label: "Album Library", icon: Disc3 },
  { id: "links", label: "Streaming Links", icon: Link2 },
  { id: "guides", label: "Streaming Guides", icon: BookOpen },
  { id: "milestones", label: "Milestones", icon: Target },
  { id: "missions", label: "Daily Missions", icon: ListChecks },
  { id: "members", label: "Members", icon: Users },
  { id: "charts", label: "Charts", icon: BarChart3 },
  { id: "news", label: "News", icon: Newspaper },
];

export default function BoraStreams() {
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("home");
  const [query, setQuery] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set());
  const [missionsDone, setMissionsDone] = useState(() => new Set());
  const [songFilter, setSongFilter] = useState("All");
  const [activeMember, setActiveMember] = useState(null);

  const nextEvent = useMemo(() => {
    const target = new Date();
    target.setDate(target.getDate() + 6);
    target.setHours(12, 0, 0, 0);
    return target;
  }, []);
  const countdown = useCountdown(nextEvent);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleMission = (id) => {
    setMissionsDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredSongs = useMemo(() => {
    return SONGS.filter((s) => {
      const matchesFilter = songFilter === "All" || s.category === songFilter;
      const matchesQuery = query.trim() === "" ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, songFilter]);

  const filteredAlbums = useMemo(() => {
    return ALBUMS.filter((a) => query.trim() === "" || a.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredMembers = useMemo(() => {
    return MEMBERS.filter((m) => query.trim() === "" || m.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    document.title = "BoraStreams";
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = LOGO_SRC;
  }, []);

  const isDark = theme === "dark";

  return (
    <div style={{
      "--bg": isDark ? "#0C0B12" : "#F7F5FB",
      "--surface": isDark ? "#17141F" : "#FFFFFF",
      "--surface2": isDark ? "#1F1B2B" : "#F0ECF9",
      "--text": isDark ? "#F2EFFA" : "#171426",
      "--muted": isDark ? "#9891AC" : "#6B647F",
      "--accent": isDark ? "#9B7FE8" : "#7C5CD1",
      "--gold": isDark ? "#E8B454" : "#C98F2E",
      "--border": isDark ? "#2A2538" : "#E4DEF2",
      fontFamily: "'Manrope', sans-serif",
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
      display: "flex",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .display { font-family: 'Bebas Neue', 'Manrope', sans-serif; letter-spacing: 0.04em; }
        @keyframes eqPulse { from { transform: scaleY(0.5); opacity: .6 } to { transform: scaleY(1); opacity: 1 } }
        .navbtn { transition: background .15s, color .15s; }
        .navbtn:hover { background: var(--surface2); }
        .card { transition: transform .15s, border-color .15s; }
        .card:hover { transform: translateY(-2px); border-color: var(--accent); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        button { font-family: inherit; cursor: pointer; }
        input { font-family: inherit; }
        @media (max-width: 860px) {
          .sidebar { position: fixed; z-index: 40; height: 100vh; transform: translateX(-100%); transition: transform .2s; }
          .sidebar.open { transform: translateX(0); }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`sidebar ${navOpen ? "open" : ""}`} style={{
        width: 240, flexShrink: 0, background: "var(--surface)", borderRight: "1px solid var(--border)",
        padding: "22px 14px", display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 20px" }}>
          <img src={LOGO_SRC} alt="BoraStreams" style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0 }} />
          <span className="display" style={{ fontSize: 24, color: "var(--text)", lineHeight: 1 }}>BORASTREAMS</span>
        </div>
        {NAV.map((n) => {
          const Icon = n.icon;
          const activeItem = view === n.id;
          return (
            <button key={n.id} className="navbtn" onClick={() => { setView(n.id); setNavOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10,
              border: "none", background: activeItem ? "var(--surface2)" : "transparent",
              color: activeItem ? "var(--accent)" : "var(--text)", fontWeight: activeItem ? 700 : 500,
              fontSize: 14, textAlign: "left",
            }}>
              <Icon size={17} /> {n.label}
            </button>
          );
        })}
        <div style={{ marginTop: "auto", padding: "14px 10px 4px", fontSize: 11, color: "var(--muted)" }}>
          MVP preview · data shown is illustrative
        </div>
        <div style={{
          margin: "10px 4px 2px", padding: "10px 12px", borderRadius: 10,
          background: "var(--surface2)", border: "1px solid var(--accent)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Created by</div>
          <div style={{ fontWeight: 800, fontSize: 13, color: "var(--accent)", letterSpacing: "0.02em" }}>
            @bts_votings on YT
          </div>
        </div>
      </aside>
      {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: "fixed", inset: 0, background: "#000000aa", zIndex: 30 }} />}

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* TOP BAR */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "16px 24px",
          borderBottom: "1px solid var(--border)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <button onClick={() => setNavOpen(true)} style={{
            display: "none", background: "none", border: "none", color: "var(--text)",
          }} className="mobileOnly">
            <Menu size={20} />
          </button>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, flex: 1, maxWidth: 420,
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px",
          }}>
            <Search size={16} color="var(--muted)" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search songs, albums, members…"
              style={{ border: "none", outline: "none", background: "transparent", color: "var(--text)", fontSize: 14, width: "100%" }} />
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)",
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: "6px 12px",
          }}>
            <Timer size={14} color="var(--gold)" />
            <span style={{ color: "var(--text)", fontWeight: 700 }}>{countdown.d}d {countdown.h}h {countdown.m}m {countdown.s}s</span>
            <span>to next event</span>
          </div>
          <button onClick={() => setTheme(isDark ? "light" : "dark")} style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 9, color: "var(--text)",
          }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div style={{ padding: "28px 24px 60px", maxWidth: 1180, margin: "0 auto" }}>
          {view === "home" && (
            <Home_
              countdown={countdown} favorites={favorites} toggleFavorite={toggleFavorite}
              setView={setView} setActiveMember={setActiveMember}
            />
          )}
          {view === "songs" && (
            <SongsView songs={filteredSongs} favorites={favorites} toggleFavorite={toggleFavorite}
              filter={songFilter} setFilter={setSongFilter} />
          )}
          {view === "albums" && <AlbumsView albums={filteredAlbums} />}
          {view === "links" && <LinksView />}
          {view === "guides" && <GuidesView />}
          {view === "milestones" && <MilestonesView />}
          {view === "missions" && <MissionsView done={missionsDone} toggle={toggleMission} />}
          {view === "members" && (
            <MembersView members={filteredMembers} active={activeMember} setActive={setActiveMember} />
          )}
          {view === "charts" && <ChartsView />}
          {view === "news" && <NewsView />}
        </div>

        {/* FOOTER CREDIT */}
        <div style={{
          textAlign: "center", padding: "18px 20px 30px", fontSize: 12, color: "var(--muted)",
          borderTop: "1px solid var(--border)", marginTop: 10,
        }}>
          BoraStreams · Created by <strong style={{ color: "var(--accent)" }}>@bts_votings</strong> on YT
        </div>
      </main>
    </div>
  );
}

/* --------------------------------- SECTIONS --------------------------------- */

function SectionTitle({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
      <div>
        {eyebrow && <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>{eyebrow}</div>}
        <h2 className="display" style={{ fontSize: 34, margin: 0, lineHeight: 1 }}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

function Home_({ countdown, favorites, toggleFavorite, setView, setActiveMember }) {
  return (
    <div>
      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)",
        border: "1px solid var(--border)", borderRadius: 20, padding: "40px 32px", marginBottom: 28,
        display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <EqBars size={18} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.08em" }}>LATEST COMEBACK</span>
          </div>
          <h1 className="display" style={{ fontSize: 56, lineHeight: 0.95, margin: "0 0 12px" }}>
            NEW SINGLE<br/>TEASER IS LIVE
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>
            Countdown to the full release: <strong style={{ color: "var(--text)" }}>{countdown.d}d {countdown.h}h {countdown.m}m</strong>.
            Jump into today's missions or check the streaming guide before it drops.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setView("missions")} style={{
              background: "var(--accent)", color: "#fff", border: "none", borderRadius: 10,
              padding: "11px 20px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6,
            }}>
              <Play size={15} /> Start Daily Missions
            </button>
            <button onClick={() => setView("guides")} style={{
              background: "transparent", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10,
              padding: "11px 20px", fontWeight: 700, fontSize: 14,
            }}>
              Read Streaming Guide
            </button>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
            Created by <strong style={{ color: "var(--gold)" }}>@bts_votings</strong> on YT
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, minWidth: 240 }}>
          {[["Days", countdown.d], ["Hrs", countdown.h], ["Min", countdown.m], ["Sec", countdown.s]].map(([l, v]) => (
            <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
              <div className="display" style={{ fontSize: 30, color: "var(--accent)" }}>{String(v).padStart(2, "0")}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACCESS */}
      <SectionTitle eyebrow="Jump in" title="Quick Access" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
        {[
          { id: "songs", label: "Song Library", icon: Music },
          { id: "links", label: "Streaming Links", icon: Link2 },
          { id: "milestones", label: "Milestones", icon: Target },
          { id: "charts", label: "Charts", icon: BarChart3 },
        ].map((q) => {
          const Icon = q.icon;
          return (
            <button key={q.id} onClick={() => setView(q.id)} className="card" style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18,
              display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start", color: "var(--text)",
            }}>
              <Icon size={20} color="var(--accent)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>{q.label}</span>
              <ChevronRight size={14} color="var(--muted)" />
            </button>
          );
        })}
      </div>

      {/* MILESTONE PREVIEW */}
      <SectionTitle eyebrow="Ongoing" title="Current Goals" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 32 }}>
        {MILESTONES.slice(0, 2).map((m) => <MilestoneCard key={m.id} m={m} />)}
      </div>

      {/* MEMBERS STRIP */}
      <SectionTitle eyebrow="The group" title="Members" />
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 }}>
        {MEMBERS.map((m) => (
          <button key={m.id} onClick={() => setActiveMember(m.id)} className="card" style={{
            minWidth: 110, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14,
            padding: "16px 10px", textAlign: "center", flexShrink: 0,
          }}>
            <div style={{ margin: "0 auto 8px", display: "flex", justifyContent: "center" }}><MemberAvatar member={m} size={44} /></div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{m.name}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{m.role}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({ m }) {
  const pct = Math.min(100, (m.current / m.target) * 100);
  return (
    <div className="card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{m.title}</span>
        <Target size={16} color="var(--gold)" />
      </div>
      <div style={{ height: 8, background: "var(--surface2)", borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--accent), var(--gold))" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
        <span>{m.current}{m.unit} reached</span>
        <span>{m.target}{m.unit} goal · {pct.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function SongsView({ songs, favorites, toggleFavorite, filter, setFilter }) {
  const cats = ["All", "Group", "Solo", "OST", "Japanese"];
  return (
    <div>
      <SectionTitle eyebrow={`${songs.length} tracks`} title="Song Library" />
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            border: `1px solid ${filter === c ? "var(--accent)" : "var(--border)"}`,
            background: filter === c ? "var(--surface2)" : "transparent", color: filter === c ? "var(--accent)" : "var(--text)",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {songs.map((s) => (
          <div key={s.id} className="card" style={{
            display: "flex", alignItems: "center", gap: 14, background: "var(--surface)",
            border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8, background: "var(--surface2)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}><Music size={15} color="var(--accent)" /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.artist} · {s.album} · {s.year}</div>
            </div>
            <span style={{
              fontSize: 11, color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 999, padding: "3px 9px", flexShrink: 0,
            }}>{s.category}</span>
            <button onClick={() => toggleFavorite(s.id)} style={{ background: "none", border: "none", flexShrink: 0 }}>
              <Heart size={17} color={favorites.has(s.id) ? "var(--gold)" : "var(--muted)"} fill={favorites.has(s.id) ? "var(--gold)" : "none"} />
            </button>
          </div>
        ))}
        {songs.length === 0 && <EmptyState text="No songs match your search." />}
      </div>
    </div>
  );
}

function AlbumsView({ albums }) {
  return (
    <div>
      <SectionTitle eyebrow={`${albums.length} albums`} title="Album Library" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        {albums.map((a) => (
          <div key={a.id} className="card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
            <div style={{
              width: "100%", aspectRatio: "1", borderRadius: 10, marginBottom: 12,
              background: "linear-gradient(135deg, var(--accent), var(--gold))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Disc3 size={30} color="#fff" /></div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{a.title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{a.type}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
              <span>{a.date}</span><span>{a.tracks} tracks</span>
            </div>
          </div>
        ))}
        {albums.length === 0 && <EmptyState text="No albums match your search." />}
      </div>
    </div>
  );
}

function LinksView() {
  return (
    <div>
      <SectionTitle eyebrow="Official platforms" title="Streaming Links" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {PLATFORMS.map((p) => (
          <div key={p.id} className="card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: p.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Radio size={16} color={p.color} />
              </div>
              <span style={{ fontWeight: 800, fontSize: 15 }}>{p.name}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginBottom: 14 }}>{p.note}</p>
            <button style={{
              width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10,
              padding: "9px 0", fontWeight: 700, fontSize: 13, color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><Play size={13} /> Open official artist page</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidesView() {
  const guides = [
    { platform: "Spotify", steps: ["Stream from the official artist page or verified playlists.", "Let each track play past 30 seconds without skipping.", "Avoid repeat-looping a single track back to back — alternate tracks.", "Use an active account, not a guest/incognito session."] },
    { platform: "Apple Music", steps: ["Play from the album, not a personal mixed playlist.", "Keep autoplay off between unrelated albums to avoid dilution.", "Give the song a 'love' after a full listen, not before."] },
    { platform: "YouTube", steps: ["Watch on the official channel's upload only.", "Keep the tab active and volume unmuted.", "Avoid ad-blockers on the video; ads help count views correctly.", "Don't open multiple tabs of the same video at once."] },
  ];
  return (
    <div>
      <SectionTitle eyebrow="Do it right" title="Streaming Guides" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {guides.map((g) => (
          <div key={g.platform} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>{g.platform}</div>
            <ol style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              {g.steps.map((s, i) => <li key={i} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 14, padding: 18, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Timer size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Streaming Timer tip</div>
          <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
            Take a short break every 45–60 minutes of continuous streaming. Long unbroken loops can look automated to platforms and may not count correctly.
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestonesView() {
  return (
    <div>
      <SectionTitle eyebrow="Live progress" title="Milestone Tracker" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {MILESTONES.map((m) => <MilestoneCard key={m.id} m={m} />)}
      </div>
    </div>
  );
}

function MissionsView({ done, toggle }) {
  return (
    <div>
      <SectionTitle eyebrow={`${done.size}/${MISSIONS_TEMPLATE.length} complete today`} title="Daily Missions" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MISSIONS_TEMPLATE.map((m) => {
          const isDone = done.has(m.id);
          return (
            <button key={m.id} onClick={() => toggle(m.id)} style={{
              display: "flex", alignItems: "center", gap: 12, textAlign: "left",
              background: "var(--surface)", border: `1px solid ${isDone ? "var(--accent)" : "var(--border)"}`,
              borderRadius: 12, padding: "14px 16px", color: "var(--text)",
            }}>
              {isDone ? <CheckCircle2 size={20} color="var(--accent)" /> : <Circle size={20} color="var(--muted)" />}
              <span style={{ fontSize: 14, textDecoration: isDone ? "line-through" : "none", opacity: isDone ? 0.6 : 1 }}>{m.text}</span>
            </button>
          );
        })}
      </div>
      {done.size === MISSIONS_TEMPLATE.length && (
        <div style={{ marginTop: 16, background: "var(--surface2)", border: "1px solid var(--accent)", borderRadius: 12, padding: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <Award size={20} color="var(--gold)" />
          <span style={{ fontSize: 14, fontWeight: 600 }}>All missions complete for today — nice work!</span>
        </div>
      )}
    </div>
  );
}

function MembersView({ members, active, setActive }) {
  const m = MEMBERS.find((x) => x.id === active);
  if (m) {
    return (
      <div>
        <button onClick={() => setActive(null)} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>← Back to Members</button>
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
          <MemberAvatar member={m} size={90} />
          <div>
            <h1 className="display" style={{ fontSize: 44, margin: 0, lineHeight: 1 }}>{m.name.toUpperCase()}</h1>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>{m.full} · {m.role}</div>
          </div>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, maxWidth: 600, marginBottom: 24 }}>{m.bio}</p>
        <SectionTitle eyebrow="Discography" title="Solo Tracks" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SONGS.filter((s) => s.artist.toLowerCase().includes(m.name.toLowerCase())).map((s) => (
            <div key={s.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.album} · {s.year}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionTitle eyebrow="The seven" title="Members" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {members.map((mem) => (
          <button key={mem.id} onClick={() => setActive(mem.id)} className="card" style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, textAlign: "left", color: "var(--text)",
          }}>
            <div style={{ marginBottom: 12 }}><MemberAvatar member={mem} size={52} /></div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{mem.name}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{mem.role}</div>
            <div style={{ fontSize: 12, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>View page <ChevronRight size={12} /></div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChartsView() {
  return (
    <div>
      <SectionTitle eyebrow="Right now" title="Charts" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {CHARTS.map((c) => (
          <div key={c.platform} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <TrendingUp size={16} color="var(--accent)" />
              <span style={{ fontWeight: 800, fontSize: 14 }}>{c.platform}</span>
            </div>
            {c.entries.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                <span className="display" style={{ fontSize: 20, color: "var(--gold)", width: 30 }}>#{e.rank}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{e.artist}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsView() {
  return (
    <div>
      <SectionTitle eyebrow="Stay updated" title="News & Updates" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {NEWS.map((n) => (
          <div key={n.id} style={{ display: "flex", gap: 14, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 999, padding: "3px 10px", flexShrink: 0 }}>{n.tag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}><Calendar size={11} /> {n.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontSize: 14 }}>{text}</div>
  );
}