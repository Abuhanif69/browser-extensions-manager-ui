/* SELECT ELEMENTS */
const themeToggle = document.querySelector('.theme-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const extensionGrid = document.querySelector('.extension-grid');

/* DARK MODE TOGGLE */
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');

  // Save preference
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}

/* FILTER LOGIC */
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Active button style
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.textContent.toLowerCase();
    const cards = document.querySelectorAll('.extension-card');

    cards.forEach(card => {
      const status = card.dataset.status;

      if (filter === 'all') {
        card.style.display = 'flex';
      } else if (filter === status) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* CARD INTERACTIONS */
extensionGrid.addEventListener('click', e => {
  const card = e.target.closest('.extension-card');
  if (!card) return;

  /* REMOVE EXTENSION */
  if (e.target.classList.contains('remove-btn')) {
    card.remove();
  }
});

/* TOGGLE ACTIVE / INACTIVE */
extensionGrid.addEventListener('change', e => {
  if (e.target.type === 'checkbox') {
    const card = e.target.closest('.extension-card');

    if (e.target.checked) {
      card.dataset.status = 'active';
    } else {
      card.dataset.status = 'inactive';
    }
  }
});
