const card = document.getElementById('pokemon-card');
const btn = document.getElementById('generate-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

// Create email/password login and sign-up form
const authSection = document.getElementById('auth-section');
const form = document.createElement('form');
form.id = 'auth-form';
form.innerHTML = `
  <input type="email" id="email" placeholder="Email" required style="margin-bottom:8px;width:100%;padding:8px;" />
  <input type="password" id="password" placeholder="Password" required style="margin-bottom:8px;width:100%;padding:8px;" />
  <button type="submit" id="email-login-btn">Login</button>
  <button type="button" id="email-signup-btn" style="margin-left:8px;">Sign Up</button>
`;
authSection.insertBefore(form, loginBtn);
loginBtn.style.display = 'none'; // Hide Google login

const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const emailLoginBtn = form.querySelector('#email-login-btn');
const emailSignupBtn = form.querySelector('#email-signup-btn');

// Firebase config (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyAoMC6SE58fC58uDB0fbtU1YyigLE5DDvU",
  authDomain: "flashcardio-11.firebaseapp.com",
  projectId: "flashcardio-11",
  appId: "1:669106215792:web:b1e9240a314abc7d6bcdb5"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function updateUI(user) {
  if (user) {
    userInfo.textContent = `Logged in as: ${user.email}`;
    form.style.display = 'none';
    logoutBtn.style.display = '';
    card.style.display = '';
    btn.style.display = '';
    fetchRandomPokemon();
  } else {
    userInfo.textContent = '';
    form.style.display = '';
    logoutBtn.style.display = 'none';
    card.style.display = 'none';
    btn.style.display = 'none';
  }
}

auth.onAuthStateChanged(updateUI);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert('Login failed: ' + err.message);
  }
});

emailSignupBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert('Sign up successful! You are now logged in.');
  } catch (err) {
    alert('Sign up failed: ' + err.message);
  }
});

logoutBtn.onclick = () => auth.signOut();

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
// Remove auto-fetch on load, only fetch after login

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
