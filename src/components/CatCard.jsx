// Shows one cat. The cat arrives as a prop, for example:
// { id: 1, name: "Mittens", location: "Mumbai", image: "cats/1.jpg" }
function CatCard({ cat }) {
  return (
    <div className="cat-card">
      <div className="cat-photo">
        <img
          src={cat.image}
          alt={cat.name}
          loading="lazy"
          onError={(e) => (e.target.style.visibility = "hidden")}
        />
        <span className="cat-number">#{cat.id}</span>
      </div>
      <h3>{cat.name}</h3>
      <p>{cat.location}</p>
    </div>
  );
}

export default CatCard;
