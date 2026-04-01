let activeFilter = 'all';

function Filtering() {
    let buttons = document.querySelectorAll('.btns button');

    function getBlocks() {
        return document.querySelectorAll('.single');
    }

    function render(filter) {
        let blocks = getBlocks();

        blocks.forEach(block => {
            const match =
                filter === 'all' ||
                block.dataset.menu === filter;

            block.classList.remove('show', 'hide');

            if (match) {
                block.classList.add('show');
            } else {
                block.classList.add('hide');
            }
        });
    }

    function updateButtonsUI() {
        buttons.forEach(btn => {
            btn.classList.toggle(
                'selected',
                btn.dataset.menu === activeFilter
            );
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeFilter = e.currentTarget.dataset.menu; // 🔥 важливо
            render(activeFilter);
            updateButtonsUI();
        });
    });

    render(activeFilter);
    updateButtonsUI();
}