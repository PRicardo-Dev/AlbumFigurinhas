async function loadF1Grid() {
  const container = document.getElementById("f1-grid");

  try {
    const res = await fetch("https://ergast.com/api/f1/current/driverStandings.json");
    const data = await res.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    standings.forEach((driverData) => {
      const driver = driverData.Driver;
      const constructors = driverData.Constructors[0];
      const driverCard = document.createElement("div");
      driverCard.className = "driver-card";

      driverCard.innerHTML = `
        <img class="driver-img" src="https://cdn.racingnews365.com/2022/${driver.driverId}.jpg" alt="${driver.givenName} ${driver.familyName}" onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Foto'">
        <h3>${driver.givenName} ${driver.familyName}</h3>
        <p>Equipe: ${constructors.name}</p>
        <p>Pontos: ${driverData.points}</p>
        <p>Posição: ${driverData.position}</p>
      `;

      container.appendChild(driverCard);
    });
  } catch (error) {
    container.innerHTML = "<p>Não foi possível carregar os dados do grid.</p>";
    console.error(error);
  }
}

loadF1Grid();