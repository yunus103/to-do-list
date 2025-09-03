
export function expandTaskDetails() {
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(item => {
        const main = item.querySelector('.task-main'); // only this area should toggle
        const details = item.querySelector('.task-details');
        const label = main.querySelector('label');

        main.addEventListener('click', (e) => {
            // Allow checkbox to work normally, don't toggle on it
            if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') return;
            details.classList.toggle('show');
        });
    });
}


export function addNewTask() {
    const modal = document.getElementById('task-modal');
    const addBtn = document.getElementById('add-new-task');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('task-form');

    // Open modal
    addBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('new-title').value;
        const desc = document.getElementById('new-desc').value;
        const dueDate = document.getElementById('new-due').value;
        const priority = document.getElementById('new-priority').value;

        

        console.log({ title, desc, dueDate, priority }); // later append to list

        modal.style.display = 'none';
        taskForm.reset();
    });
}
