const card = document.getElementById('pokemon-card');
const btn = document.getElementById('generate-btn');

async function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 1010) + 1;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon');
    const data = await res.json();
    renderPokemon(data);
  } catch (err) {
    card.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
}

function renderPokemon(data) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const img = data.sprites.other['official-artwork'].front_default;
  const types = data.types.map(t => t.type.name).join(', ');
  const stats = {
    HP: data.stats[0].base_stat,
    Attack: data.stats[1].base_stat,
    Defense: data.stats[2].base_stat,
    Speed: data.stats[5].base_stat
  };
  card.innerHTML = `
    <img src="${img}" alt="${name}" />
    <div class="name">${name}</div>
    <div class="types">Type: ${types}</div>
    <div class="stats">
      <div class="stat">HP: ${stats.HP}</div>
      <div class="stat">Atk: ${stats.Attack}</div>
      <div class="stat">Def: ${stats.Defense}</div>
      <div class="stat">Spd: ${stats.Speed}</div>
    </div>
  `;
  card.classList.remove('fade');
  void card.offsetWidth;
  card.classList.add('fade');
}

btn.addEventListener('click', fetchRandomPokemon);
window.addEventListener('DOMContentLoaded', fetchRandomPokemon);

// Animation
const style = document.createElement('style');
style.innerHTML = `
.card.fade {
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(style);
