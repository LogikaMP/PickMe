let activeFilter = 'all'; // 🌍 глобальна змінна

function Filtering() {
    let buttons = document.querySelectorAll('.btns button');
    let blocks  = document.querySelectorAll('.single');

    function render(filter) {
        blocks.forEach(block => {
            const match = (filter === 'all' || block.dataset.menu === filter);

            if (match) {
                block.classList.add('active');
                block.style.transform = `scale(1)`;
                block.style.opacity = `1`;
                block.style.visibility = `visible`;
                block.style.width = `190px`;
                block.style.margin = `5px`;
                block.style.height = `190px`;
            } else {
                block.classList.remove('active');
                block.style.transform = `scale(0)`;
                block.style.opacity = `0`;
                block.style.visibility = `hidden`;
                block.style.width = `0`;
                block.style.margin = `0`;
                block.style.height = `0`;
            }
        });
    }

    function updateButtonsUI() {
        buttons.forEach(btn => {
            btn.classList.remove('selected');

            if (btn.dataset.menu === activeFilter) {
                btn.classList.add('selected');
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeFilter = e.target.dataset.menu;

            render(activeFilter);
            updateButtonsUI();
        });
    });

    // стартовий стан
    render(activeFilter);
    updateButtonsUI();
}

Filtering();