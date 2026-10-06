// Shows one match: two cats, VS, and then either the winner or "Waiting for results".
// cat1 and cat2 are full cat objects. App.jsx looks them up from the numbers in tournament.js.
function Match({ match, cat1, cat2 }) {
  // If a cat number in tournament.js is a typo, show a message instead of crashing.
  if (!cat1 || !cat2) {
    return <p className="match-error">Check the cat numbers in tournament.js ({match.round})</p>;
  }

  const hasWinner = match.winner !== null;
  const winner = match.winner === cat1.id ? cat1 : cat2;

  return (
    <div className="match">
      <p className="match-round">{match.round}</p>

      <div className="match-cats">
        {[cat1, cat2].map((cat) => {
          // Decide the CSS class: the winner stands out, the loser fades.
          let className = "fighter";
          if (hasWinner && cat.id === match.winner) className += " won";
          if (hasWinner && cat.id !== match.winner) className += " lost";

          return (
            <div className={className} key={cat.id}>
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                onError={(e) => (e.target.style.visibility = "hidden")}
              />
              <p className="fighter-number">Cat #{cat.id}</p>
              <h3>{cat.name}</h3>
              <p className="fighter-location">{cat.location}</p>
            </div>
          );
        })}
        <span className="vs">VS</span>
      </div>

      {hasWinner ? (
        <p className="match-status winner-text">🏆 Winner: {winner.name} (Cat #{winner.id})</p>
      ) : (
        <p className="match-status">Waiting for results</p>
      )}
    </div>
  );
}

export default Match;
