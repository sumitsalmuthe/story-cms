import "./StatsGrid.css";

function StatsGrid() {
  const stats = [
    {
      title: "Stories",
      value: "12",
      icon: "📚",
      color: "#ff7a1a",
    },
    {
      title: "Drafts",
      value: "4",
      icon: "📝",
      color: "#00c2ff",
    },
    {
      title: "Views",
      value: "14.2K",
      icon: "👁",
      color: "#22c55e",
    },
    {
      title: "Followers",
      value: "876",
      icon: "❤️",
      color: "#ff4d6d",
    },
  ];

  return (
    <section className="stats-grid">

      {stats.map((item, index) => (

        <div
          className="stat-card"
          key={index}
        >

          <div
            className="stat-icon"
            style={{
              background: item.color,
            }}
          >
            {item.icon}
          </div>

          <div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

          </div>

        </div>

      ))}

    </section>
  );
}

export default StatsGrid;