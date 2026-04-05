let activeFilter = 'all';

function Filtering(products) {
  const container = document.querySelector('.btns');

 function updateButtonsUI() {
  const buttons = document.querySelectorAll('.btns button');

  buttons.forEach(btn => {
    btn.classList.toggle(
      'selected',
      btn.dataset.menu === activeFilter
    );
  });
}

  function make_filter(products){
    if (activeFilter === 'all') return products;

    return products.filter(pr => pr["data-menu"] === activeFilter);
  }

  document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btns button');
  if (!btn) return;

  activeFilter = btn.dataset.menu;

  let filtered = make_filter(products);

  renderCard(filtered, true);
  updateButtonsUI();
});

  // initial state
  updateButtonsUI();
  renderCard(products, true);
}


