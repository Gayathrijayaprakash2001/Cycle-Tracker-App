document.getElementById('cycleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect data from the form
    const startDate = document.getElementById('start_date').value;
    const cycleLength = document.getElementById('cycle_length').value;
    const periodLength = document.getElementById('period_length').value;

    const data = {
        start_date: startDate,
        cycle_length: cycleLength,
        period_length: periodLength
    };

    // Send POST request with cycle data
    fetch('/add_cycle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Fetch prediction result
            fetch('/predict')
            .then(response => response.json())
            .then(prediction => {
                const predictionResult = document.getElementById('predictionResult');
                predictionResult.innerHTML = `
                    <p><strong>Next Period Start:</strong> ${prediction.next_period_start}</p>
                    <p><strong>Fertile Window:</strong> ${prediction.fertile_window.start} to ${prediction.fertile_window.end}</p>
                    <p><strong>Period Duration:</strong> ${prediction.period_duration}</p>
                `;
            });
        } else {
            alert('Error: ' + data.error);
        }
    });
});
