const slugify = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const fallbackAvatar = 'assets/img/default-avatar.jpg';

async function loadTop20Blitz() {
  try {
    const res = await fetch('https://api.chess.com/pub/leaderboards');
    const data = await res.json();
    const top20 = data.live_blitz.slice(0, 20);

    const album = document.getElementById('players-album');
    if (!album) return; 
    album.innerHTML = '';

    top20.forEach(p => {
      const fig = document.createElement('figure');
      fig.className = 'card';
      fig.dataset.username = p.username;

      const img = document.createElement('img');
      img.src = p.avatar || fallbackAvatar;
      img.alt = p.username;

      const caption = document.createElement('figcaption');
      caption.innerHTML = `<span class="name">${p.username}</span><span class="rating">${p.score}</span>`;

      fig.append(img, caption);
      album.append(fig);
    });

    bindCardInteractions();
  } catch (err) {
    console.error('[Carregar Blitz] ', err);
  }
}

async function updateRatings() {
  try {
    const res = await fetch('https://api.chess.com/pub/leaderboards');
    const data = await res.json();
    const top20 = data.live_blitz.slice(0, 20);

    top20.forEach(p => {
      const card = document.querySelector(`[data-username="${p.username}"]`);
      if (card) {
        const ratingEl = card.querySelector('.rating');
        if (ratingEl) ratingEl.textContent = p.score;
      }
    });
  } catch (err) {
    console.warn('[Update Ratings] ', err.message);
  }
}

function bindCardInteractions() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('players-album')) {
    loadTop20Blitz();
    setInterval(updateRatings, 5 * 60 * 1000);
  } else {
    bindCardInteractions();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
    }
  });
});

async function loadTop20Rapid () {
  try {
    const res = await fetch('https://api.chess.com/pub/leaderboards');
    const data = await res.json();
    const top20 = data.live_rapid.slice(0, 20);

    const album = document.getElementById('rapid-album');
    if (!album) return;
    album.innerHTML = '';

    top20.forEach(p => {
      const fig = document.createElement('figure');
      fig.className = 'card';
      fig.dataset.username = p.username;

      const img = document.createElement('img');
      img.src = p.avatar || fallbackAvatar;
      img.alt = p.username;

      const caption = document.createElement('figcaption');
      caption.innerHTML = `<span class="name">${p.username}</span><span class="rating">${p.score}</span>`;

      fig.append(img, caption);
      album.append(fig);
    });

    bindCardInteractions();
  } catch (err) {
    console.error('[Carregar Rápidas] ', err);
  }
}

async function updateRatingsRapid () {
  try {
    const res = await fetch('https://api.chess.com/pub/leaderboards');
    const data = await res.json();
    const top20 = data.live_rapid.slice(0, 20);

    top20.forEach(p => {
      const card = document.querySelector(`#rapid-album [data-username="${p.username}"]`);
      if (card) {
        const ratingEl = card.querySelector('.rating');
        if (ratingEl) ratingEl.textContent = p.score;
      }
    });
  } catch (err) {
    console.warn('[Update Ratings Rapid] ', err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('players-album')) {
    // Página Blitz
    loadTop20Blitz();
    setInterval(updateRatings, 5 * 60 * 1000);
  } else if (document.getElementById('rapid-album')) {
    // Página Rápidas
    loadTop20Rapid();
    setInterval(updateRatingsRapid, 5 * 60 * 1000);
  } else {
    bindCardInteractions();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
    }
  });
});