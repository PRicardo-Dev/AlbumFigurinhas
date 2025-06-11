async function loadF2Grid() {
  const container = document.getElementById("f2-grid");
  try {
    const res = await fetch("https://api.openf1.org/v1/drivers?category=F2&season=2025");
    const data = await res.json();

    data.forEach(driver => {
      const card = document.createElement("div");
      card.className = "driver-card";
      card.innerHTML = `
        <img class="driver-img" src="${driver.headshot_url || 'https://via.placeholder.com/300x200?text=Sem+Foto'}" alt="${driver.full_name}" />
        <h3>${driver.full_name}</h3>
        <p>Equipe: ${driver.team_name || 'N/A'}</p>
        <p>Código do país: ${driver.country_code || 'N/A'}</p>`;
      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p>Erro ao carregar dados da F2 2025.</p>";
    console.error(e);
  }
}

loadF2Grid();