// Знаходимо кнопку "Знайти" на сторінці
const searchBtn = document.querySelector("button");

// Знаходимо поле для введення назви гри
const searchInput = document.querySelector(".search-input");

// Знаходимо блок, у який будемо виводити картки ігор
const gamesGrid = document.querySelector(".games-grid");

// Додаємо обробник події для кнопки.
// Коли користувач натисне кнопку, виконається функція searchGames()
searchBtn.addEventListener("click", searchGames);

// Асинхронна функція для отримання даних з API
async function searchGames() {

    // Отримуємо текст із поля введення
    // trim() прибирає зайві пробіли
    // toLowerCase() переводить текст у нижній регістр
    const text = searchInput.value.toLowerCase().trim();

    try {

        // Надсилаємо запит до FreeToGame API
        const response = await fetch(
            "https://www.freetogame.com/api/games"
        );

        // Перетворюємо відповідь сервера з JSON у JavaScript-масив
        const games = await response.json();

        // Очищаємо попередні результати пошуку
        gamesGrid.innerHTML = "";

        // Відбираємо лише ті ігри,
        // назва яких містить введений текст
        const filteredGames = games.filter(game =>
            game.title.toLowerCase().includes(text)
        );

        // Якщо жодної гри не знайдено
        if (filteredGames.length === 0) {

            // Показуємо повідомлення
            gamesGrid.innerHTML =
                "<h3>Ігор не знайдено</h3>";

            // Завершуємо виконання функції
            return;
        }

        // Перебираємо всі знайдені ігри
        filteredGames.forEach(game => {

            // Додаємо HTML-картку гри до контейнера
            gamesGrid.innerHTML += `
                <a href="${game.game_url}"
                   target="_blank"
                   class="game-card">

                    <img src="${game.thumbnail}"
                         alt="${game.title}">

                    <div class="game-card-title">
                        ${game.title}
                    </div>

                </a>
            `;
        });

    } catch (error) {

        // Якщо сталася помилка, показуємо її в консолі
        console.error(error);

        // Виводимо повідомлення користувачу
        gamesGrid.innerHTML =
            "<h3>Помилка завантаження даних</h3>";
    }
}


function openModal(type) {

    const modal =
        document.getElementById("modal");

    const modalBody =
        document.getElementById("modalBody");

    if (type === "about") {

        modalBody.innerHTML = `
            <h2>Про сайт</h2>

            <p>
                GameFinder — це каталог ігор,
                який допомагає знаходити ігри
                через API FreeToGame.
            </p>

            <p>
                Тут можна переглядати
                популярні та нові ігри.
            </p>
        `;
    }

    if (type === "popular") {

        modalBody.innerHTML = `
            <h2>Популярні ігри</h2>

            <ul>
                <li>Cyberpunk 2077</li>
                <li>The Witcher 3</li>
                <li>Grand Theft Auto V</li>
                <li>Total War</li>
                <li>Fortnite</li>
            </ul>
        `;
    }

    if (type === "news") {

        modalBody.innerHTML = `
            <h2>Новинки 2026</h2>

            <p>GTA VI</p>
            <p>Black Myth Wukong</p>
            <p>Ark 2</p>
            <p>State of Decay 3</p>
        `;
    }

    if (type === "authors") {

        modalBody.innerHTML = `
            <h2>Автори проєкту</h2>

            <p>Павловський Тарас</p>
            <p>Талащук Максим</p>
            <p>Ярмушко Артем</p>
        `;
    }

    modal.style.display = "block";
}

function closeModal() {

    document.getElementById("modal").style.display =
        "none";
}

window.onclick = function(event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {
        modal.style.display = "none";
    }
}