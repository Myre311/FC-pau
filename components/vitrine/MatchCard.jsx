import { formatMatchDate, MATCH_STATUS_LABELS } from '@/lib/labels';

export function MatchCard({ match }) {
  const isPlayed = match.status === 'played';
  const palois = isPlayed
    ? match.isHome
      ? match.homeScore
      : match.awayScore
    : null;
  const adverse = isPlayed
    ? match.isHome
      ? match.awayScore
      : match.homeScore
    : null;
  const result =
    palois == null
      ? null
      : palois > adverse
        ? 'win'
        : palois < adverse
          ? 'loss'
          : 'draw';

  return (
    <article className="border border-blanc/10 bg-primaire/20 p-5 transition-colors hover:border-blanc/25">
      <header className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-jaune">{match.competition}</span>
        <span
          className={
            match.status === 'live'
              ? 'text-jaune'
              : isPlayed
                ? 'text-blanc/40'
                : 'text-blanc/60'
          }
        >
          {MATCH_STATUS_LABELS[match.status]}
        </span>
      </header>

      <p className="mt-3 font-mono text-xs text-blanc/50">
        {formatMatchDate(match.kickoffAt)}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <Side
          name="Pau FC"
          isHome={match.isHome}
          highlightWin={result === 'win'}
        />

        {isPlayed ? (
          <div className="flex items-center gap-3 font-display text-3xl leading-crush md:text-4xl">
            <span className={result === 'win' ? 'text-jaune' : 'text-blanc'}>
              {palois}
            </span>
            <span className="text-blanc/30">·</span>
            <span className={result === 'loss' ? 'text-jaune' : 'text-blanc'}>
              {adverse}
            </span>
          </div>
        ) : (
          <span className="font-display text-2xl leading-crush text-blanc/40 md:text-3xl">
            VS
          </span>
        )}

        <Side
          name={match.opponent}
          isHome={!match.isHome}
          highlightWin={result === 'loss'}
          align="right"
        />
      </div>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-blanc/10 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-blanc/50">
        <span>{match.venue}</span>
        <div className="flex items-center gap-3">
          {match.broadcaster && <span>{match.broadcaster}</span>}
          {match.ticketUrl && match.status === 'scheduled' && (
            <a
              href={match.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-jaune/40 pb-0.5 text-jaune transition-colors hover:border-jaune"
            >
              Billetterie →
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}

function Side({ name, isHome, highlightWin, align = 'left' }) {
  return (
    <div className={`flex-1 ${align === 'right' ? 'text-right' : ''}`}>
      <p
        className={`font-display text-base uppercase leading-tight tracking-tightest md:text-lg ${
          highlightWin ? 'text-jaune' : 'text-blanc'
        }`}
      >
        {name}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/40">
        {isHome ? 'Domicile' : 'Extérieur'}
      </p>
    </div>
  );
}
