// --- 1. Зберігання даних у браузері[cite: 1] ---
const systemInfo = {
    os: navigator.platform || "Невідома ОС",
    browser: navigator.userAgent
};
// Збереження у localStorage[cite: 1]
localStorage.setItem('sysInfo', JSON.stringify(systemInfo));

// Відображення у футері[cite: 1]
const savedInfo = JSON.parse(localStorage.getItem('sysInfo'));
const footerDiv = document.getElementById('system-info');
if (savedInfo) {
    footerDiv.innerHTML = `<p>ОС: ${savedInfo.os}</p><p>Браузер: ${savedInfo.browser}</p>`;
}


// --- 2. Відображення динамічного вмісту[cite: 1] ---
const variant = 1; // Заміни на свій номер за журналом[cite: 1]
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variant}/comments`;

fetch(apiUrl)
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        // Відображення у порядку отримання[cite: 1]
        comments.forEach(comment => {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.innerHTML = `
                <h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Помилка завантаження коментарів:", error));


// --- 3. Модальне вікно форми зворотного зв'язку[cite: 1, 2] ---
const modal = document.getElementById('feedback-modal');
const closeModalBtn = document.getElementById('close-modal');

// Показ через 1 хвилину (60000 мілісекунд)[cite: 1]
setTimeout(() => {
    modal.classList.remove('hidden');
}, 60000);

// Закриття на хрестик
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});


// --- 4. Перехід на нічний/денний режим[cite: 2] ---
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');

// Автоматичне перемикання за часом доби[cite: 2]
const currentHour = new Date().getHours();
if (currentHour >= 7 && currentHour < 21) {
    body.classList.remove('dark-mode'); // Денна тема[cite: 2]
} else {
    body.classList.add('dark-mode'); // Нічна тема[cite: 2]
}

// Ручне перемикання кнопкою[cite: 2]
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});