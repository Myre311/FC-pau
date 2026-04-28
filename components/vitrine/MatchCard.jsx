import { formatMatchDate, MATCH_STATUS_LABELS } from '@/lib/labels';
import { TeamLogo } from '@/components/vitrine/TeamLogo';
import Image from 'next/image';

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

  const isLigue2 = match.competition?.includes('Ligue 2') || match.competition?.includes('L2');

  return (
    <article className="border border-white/10 bg-pau-primary p-5 transition-colors hover:border-white/25">
      <header className="flex items-center justify-between">
        {isLigue2 ? (
          <Image
            src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
            alt="Ligue 2 BKT"
            width={80}
            height={23}
            className="h-auto w-16 md:w-20"
          />
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
            {match.competition}
          </span>
        )}
        <span
          className={
            match.status === 'live'
              ? 'text-pau-yellow'
              : isPlayed
                ? 'text-white/40'
                : 'text-white/60'
          }
        >
          {MATCH_STATUS_LABELS[match.status]}
        </span>
      </header>

      <p className="mt-3 font-mono text-xs text-white/50">
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

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
        <span>{match.venue}</span>
        <div className="flex items-center gap-3">
          {match.broadcaster && <span>{match.broadcaster}</span>}
          {match.ticketUrl && match.status === 'scheduled' && (
            <a
              href={match.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-pau-yellow/40 pb-0.5 text-pau-yellow transition-colors "
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
        <span className={result === 'win' ? 'text-pau-yellow' : 'text-white'}>
          {palois}
        </span>
        <span className="text-white/30">·</span>
        <span className={result === 'loss' ? 'text-pau-yellow' : 'text-white'}>
          {adverse}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center border-2 border-pau-yellow bg-pau-yellow px-4 py-2 text-pau-night">
      <span className="font-display text-lg font-black leading-none md:text-xl">VS</span>
    </div>
  );
}

function Side({ name, isHome, highlightWin, align = 'left' }) {
  return (
    <div className={`flex-1 ${align === 'right' ? 'text-right' : ''}`}>
      <p
        className={`font-display text-base uppercase leading-tight tracking-tightest md:text-lg ${
          highlightWin ? 'text-pau-yellow' : 'text-white'
        }`}
      >
        {name}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
        {isHome ? 'Domicile' : 'Extérieur'}
      </p>
    </div>
  );
}
