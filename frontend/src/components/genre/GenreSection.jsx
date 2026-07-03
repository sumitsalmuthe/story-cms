import "./GenreSection.css";

function GenreSection() {

  const genres = [
    "Fantasy",
    "Horror",
    "Zombie",
    "Sci-Fi",
    "Adventure",
    "Mystery"
  ];

  return (

    <section className="genre-section">

      <div className="section-header">

        <h2>Browse Genres</h2>

        <p>
          Find your next favorite story.
        </p>

      </div>

      <div className="genre-grid">

        {genres.map((genre) => (

          <div
            key={genre}
            className="genre-card"
          >

            <h3>{genre}</h3>

          </div>

        ))}

      </div>

    </section>

  );

}

export default GenreSection;