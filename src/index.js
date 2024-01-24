document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-header');
    const arrow = item.querySelector('.arrow');
    const answer = item.querySelector('.faq-answer');

    header.addEventListener('click', () => {
        const isOpen = answer.style.display === "block";
        answer.style.display = isOpen ? "none" : "block";
        arrow.innerHTML = isOpen ? "&#9654;" : "&#9660;"; // Change arrow direction
    });
});