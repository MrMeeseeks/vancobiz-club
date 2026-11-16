/* eslint-disable @next/next/no-img-element -- plain <img> keeps the card portable to WordPress */
import "./member-card.css";

export type Member = {
  name: string;
  category: string;
  phone?: string;
  instagram?: string;
  photo?: string;
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function instagramHandle(v: string) {
  const handle = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/\/$/, "");
  return { handle, url: `https://instagram.com/${handle}` };
}

/**
 * Engraved gold-foil member plate. Requires <GoldDefs /> once on the page.
 * Markup + member-card.css are plain HTML/CSS so the card can be pasted into Elementor.
 */
export default function MemberCard({ member }: { member: Member }) {
  const ig = member.instagram ? instagramHandle(member.instagram) : null;
  const photo = member.photo ? (member.photo.startsWith("/") ? BASE + member.photo : member.photo) : null;

  return (
    <article className="vbc-card">
      <div className="vbc-card__plate">
        <svg className="vbc-card__art" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <rect width="400" height="240" fill="url(#vbc-foil)" />
          <use href="#vbc-rays" x="200" y="120" />
          <use href="#vbc-guilloche" x="200" y="120" />
          <rect width="400" height="240" fill="url(#vbc-glow)" />
          <use href="#vbc-frame" />
        </svg>
        <span className="vbc-card__sheen" aria-hidden="true" />
        <div className="vbc-card__medallion">
          {photo ? (
            <img src={photo} alt={`Portrait of ${member.name}`} loading="lazy" />
          ) : (
            <span className="vbc-card__initials" aria-hidden="true">
              {initials(member.name)}
            </span>
          )}
        </div>
      </div>

      <div className="vbc-card__body">
        <h3 className="vbc-card__name">{member.name}</h3>
        <p className="vbc-card__category">{member.category}</p>
        {(member.phone || ig) && (
          <ul className="vbc-card__links">
            {member.phone && (
              <li>
                <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                  </svg>
                  {member.phone}
                </a>
              </li>
            )}
            {ig && (
              <li>
                <a href={ig.url} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 7a5.4 5.4 0 0 0-1.5-3.9A5.5 5.5 0 0 0 16.5 1.6C15 1.5 9 1.5 7.5 1.6A5.5 5.5 0 0 0 3.6 3.1 5.4 5.4 0 0 0 2.1 7C2 8.5 2 15.5 2.1 17a5.4 5.4 0 0 0 1.5 3.9 5.5 5.5 0 0 0 3.9 1.5c1.5.1 7.5.1 9 0a5.4 5.4 0 0 0 3.9-1.5 5.5 5.5 0 0 0 1.5-3.9c.1-1.5.1-8.5 0-10zm-2.2 12a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.2.4s-4.1.1-5.2-.4A3 3 0 0 1 5.9 19c-.5-1.2-.4-4-.4-5.2s-.1-4.1.4-5.2A3 3 0 0 1 7.6 6.9c1.2-.5 4-.4 5.2-.4s4.1-.1 5.2.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.2s.1 4-.4 5.2z" />
                  </svg>
                  @{ig.handle}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}
