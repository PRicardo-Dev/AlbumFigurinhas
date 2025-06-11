async function loadF3Grid() {
  const container = document.getElementById("f3-grid");

  try {
    const res = await fetch("https://api.openf1.org/v1/drivers?category=F3&season=2025");
    const data = await res.json();

    data.forEach((driver) => {
      const driverCard = document.createElement("div");
      driverCard.className = "driver-card";

      driverCard.innerHTML = `
        <img class="driver-img" src="${driver.headshot_url || 'https://via.placeholder.com/300x200?text=Sem+Foto'}" alt="${driver.full_name}" />
        <h3>${driver.full_name}</h3>
        <p>Equipe: ${driver.team_name || 'N/A'}</p>
        <p>Código do país: ${driver.country_code || 'N/A'}</p>
      `;

      container.appendChild(driverCard);
    });
  } catch (error) {
    container.innerHTML = "<p>Não foi possível carregar os dados da F3 2025.</p>";
    console.error(error);
  }
}

loadF3Grid();