// Dark Mode Toggle
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    document.documentElement.toggleAttribute('data-theme', 'dark');
    toggleButton.textContent = document.documentElement.hasAttribute('data-theme') ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
});

// Enviar ticket con accesibilidad
document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    fetch('/classify-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, priority })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ticketResponse').innerHTML = `
            <h3>Ticket Enviado</h3>
            <p><strong>Categoría Sugerida:</strong> ${data.category}</p>
            <p><strong>Prioridad:</strong> ${data.priority}</p>
            <p><strong>Sugerencia de Solución:</strong> ${data.suggestion}</p>
        `;
    })
    .catch(error => console.error('Error:', error));
});
