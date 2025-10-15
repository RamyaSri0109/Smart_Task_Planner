let submit = document.querySelector("#submitBtn");

submit.addEventListener('click', async function() {
    let goal = document.querySelector("#input-text").value.trim();
    let outputDiv = document.querySelector('#output');

    if (!goal) {
        alert('Please enter a goal');
        return;
    }

    outputDiv.innerHTML = `<h2>Generating your Task Plan...</h2>`;

    try {
        const response = await fetch('http://localhost:3000/generate-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goal })
        });

        const data = await response.json();
        outputDiv.innerHTML = `<pre>${data.plan}</pre>`; // display neatly formatted text

    } catch (error) {
        console.error(error);
        outputDiv.innerHTML = `<p style="color:red;">Error generating plan. Please try again.</p>`;
    }
});
