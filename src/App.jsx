import cats from "./data/cats.js";
import matches, { instagramUrl, startDate } from "./data/tournament.js";
import CatCard from "./components/CatCard.jsx";
import Match from "./components/Match.jsx";
import Countdown from "./components/Countdown.jsx";

// The steps of the tournament, used for the "Tournament progress" section.
const steps = [
  { number: 32, round: "Round of 32" },
  { number: 16, round: "Round of 16" },
  { number: 8, round: "Quarterfinals" },
  { number: 4, round: "Semifinals" },
  { number: 2, round: "Final" },
];

// Find a cat from its number.
function findCat(id) {
  return cats.find((cat) => cat.id === id);
}

// A round is finished when it has matches and every match has a winner.
function isRoundFinished(roundName) {
  const roundMatches = matches.filter((match) => match.round === roundName);
  return roundMatches.length > 0 && roundMatches.every((match) => match.winner !== null);
}

function App() {
  // ----- Work out what to show, using only tournament.js -----

  // The current round is the round of the first match that has no winner yet.
  const nextMatch = matches.find((match) => match.winner === null);
  const lastMatch = matches[matches.length - 1];
  const currentRound = nextMatch ? nextMatch.round : lastMatch ? lastMatch.round : null;
  const currentMatches = matches.filter((match) => match.round === currentRound);

  // Matches that already have a winner.
  const finishedMatches = matches.filter((match) => match.winner !== null);

  // The champion is the winner of the Final (or nobody yet).
  const finalMatch = matches.find((match) => match.round === "Final" && match.winner !== null);
  const champion = finalMatch ? findCat(finalMatch.winner) : null;

  return (
    <>
      {/* 1. HERO */}
      <header className="hero">
        <p className="hero-small">The online cat competition</p>
        <h1>Fat Cats of India</h1>
        <p className="hero-text">
          32 cats enter. One wins. Every round, two cats face each other and the loser is out,
          until a single champion is left.
        </p>

        <Countdown targetDate={startDate} />

        <div className="hero-photos">
          {cats.slice(0, 4).map((cat) => (
            <img
              key={cat.id}
              src={cat.image}
              alt={cat.name}
              onError={(e) => (e.target.style.visibility = "hidden")}
            />
          ))}
        </div>
      </header>

      {/* 2. COMPETITION INFORMATION */}
      <section className="section">
        <h2>How it works</h2>
        <div className="info">
          <div>
            <strong>32 cats</strong>
            <p>Every cat in the competition is shown below with its photo, name and location.</p>
          </div>
          <div>
            <strong>Knockout rounds</strong>
            <p>Two cats play each match. The winner moves on and the loser is out.</p>
          </div>
          <div>
            <strong>Vote on Instagram</strong>
            <p>All voting happens on Instagram. This website only shows the competition.</p>
          </div>
        </div>
      </section>

      {/* 3. ALL 32 CATS */}
      <section className="section section-tinted">
        <h2>Meet the 32 cats</h2>
        <div className="cat-grid">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      </section>

      {/* 4. CURRENT MATCHES */}
      <section className="section">
        <h2>{currentRound ? `Current matches: ${currentRound}` : "Current matches"}</h2>

        {currentMatches.length === 0 ? (
          <p className="note">The matchups will be announced soon.</p>
        ) : (
          <div className="match-list">
            {currentMatches.map((match) => (
              <Match
                key={match.round + match.cat1 + match.cat2}
                match={match}
                cat1={findCat(match.cat1)}
                cat2={findCat(match.cat2)}
              />
            ))}
          </div>
        )}

        {matches.length > 0 && !nextMatch && !champion && (
          <p className="note">All results are in. The next round will be announced soon.</p>
        )}
      </section>

      {/* 5. TOURNAMENT PROGRESS */}
      <section className="section section-tinted">
        <h2>Tournament progress</h2>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.round} className={isRoundFinished(step.round) ? "step done" : "step"}>
              <strong>{step.number}</strong>
              <span>{step.round}</span>
            </div>
          ))}
          <div className={champion ? "step done" : "step"}>
            <strong>🏆</strong>
            <span>Champion</span>
          </div>
        </div>
        <p className="note">Highlighted steps are finished.</p>
      </section>

      {/* 6. RESULTS AND CHAMPION */}
      <section className="section">
        <h2>Results</h2>

        {finishedMatches.length === 0 ? (
          <p className="note">Results are being updated.</p>
        ) : (
          <ul className="results">
            {/* reverse() puts the newest result first */}
            {[...finishedMatches].reverse().map((match) => {
              const winner = findCat(match.winner);
              const loser = findCat(match.winner === match.cat1 ? match.cat2 : match.cat1);
              if (!winner || !loser) return null;
              return (
                <li key={match.round + match.cat1 + match.cat2}>
                  <span className="results-round">{match.round}</span>
                  <strong>{winner.name}</strong> beat {loser.name}
                </li>
              );
            })}
          </ul>
        )}

        <div className="champion">
          <h3>🏆 Champion</h3>
          {champion ? (
            <>
              <img
                src={champion.image}
                alt={champion.name}
                onError={(e) => (e.target.style.visibility = "hidden")}
              />
              <p className="champion-name">{champion.name}</p>
              <p>{champion.location}</p>
            </>
          ) : (
            <p>The competition is still underway.</p>
          )}
        </div>
      </section>

      {/* 7. INSTAGRAM VOTING */}
      <section className="section vote">
        <h2>Voting takes place on Instagram</h2>
        <p>
          You cannot vote on this website. Open Instagram to pick your favourite cat in every match.
        </p>
        <a className="button" href={instagramUrl} target="_blank" rel="noreferrer">
          Vote on Instagram
        </a>
      </section>
    </>
  );
}

export default App;
