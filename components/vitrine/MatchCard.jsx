import { formatMatchDate, MATCH_STATUS_LABELS } from '@/lib/labels';
import { TeamLogo } from '@/components/vitrine/TeamLogo';

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
    <article className="border border-blanc/10 bg-primaire p-5 transition-colors hover:border-blanc/25">
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

      {/* Logos + Score/VS */}
      <div className="my-6 flex items-center justify-center gap-6">
        {match.isHome ? (
          <>
            <TeamLogo name="Pau FC" isHome />
            <VsLabel isPlayed={isPlayed} result={result} palois={palois} adverse={adverse} />
            <TeamLogo name={match.opponent} />
          </>
        ) : (
          <>
            <TeamLogo name={match.opponent} />
            <VsLabel isPlayed={isPlayed} result={result} palois={palois} adverse={adverse} />
            <TeamLogo name="Pau FC" isHome />
          </>
        )}
      </div>

      {/* Noms équipes en dessous */}
      <div className="flex items-center justify-between">
        <Side
          name="Pau FC"
          isHome={match.isHome}
          highlightWin={result === 'win'}
        />
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

function VsLabel({ isPlayed, result, palois, adverse }) {
  if (isPlayed) {
    return (
      <div className="flex items-center gap-2 font-display text-2xl leading-none md:gap-3 md:text-3xl">
        <span className={result === 'win' ? 'text-jaune' : 'text-blanc'}>
          {palois}
        </span>
        <span className="text-blanc/30">·</span>
        <span className={result === 'loss' ? 'text-jaune' : 'text-blanc'}>
          {adverse}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1 border-2 border-jaune bg-jaune px-3 py-2 text-nuit">
      <span className="font-display text-sm font-black leading-none md:text-base">VS</span>
      <span className="font-mono text-[8px] font-bold uppercase leading-none tracking-tight md:text-[9px]">
        Ligue 2<br/>BKT
      </span>
    </div>
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
