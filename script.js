
    const activeTimers = {};

    function startTimer(minutes, elementId) {
        if (activeTimers[elementId]) {
            clearInterval(activeTimers[elementId]);
        }

        let duration = minutes * 60;
        const display = document.getElementById(elementId);

        activeTimers[elementId] = setInterval(() => {
            const mins = Math.floor(duration / 60);
            const secs = duration % 60;

            display.textContent = ` | Time left: ${mins}m ${secs < 10 ? '0' + secs : secs}s`;

            if (--duration < 0) {
                clearInterval(activeTimers[elementId]);
                display.textContent = " | Time's up! ⏰";
                alert("Time's up for " + elementId.replace("-", " ") + "!");
            }
        }, 1000);
    }
    const searchInput = document.getElementById('searchInput');
    const recipeCards = document.querySelectorAll('.recipe-card');
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        let firstMatch = null;

        recipeCards.forEach(card => {
            const title = card.getAttribute('data-title');
            if (title.includes(query) && query.length > 0) {
                card.classList.add('highlight');
                if (!firstMatch) {
                    firstMatch = card;
                }
            } else {
                card.classList.remove('highlight');
            }
        });

        if (firstMatch) {
            const offset = 70;
            const top = firstMatch.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }

    });