document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginResponse = await fetch('https://go-app-1-0.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const loginData = await loginResponse.json();
    const token = loginData.token;

    localStorage.setItem('token', token);
    alert('Login successful!');
});

document.getElementById('factorizeBtn').addEventListener('click', async () => {
    const matrix = JSON.parse(document.getElementById('matrixInput').value);
    const token = localStorage.getItem('token');

    const factorizeResponse = await fetch('https://go-app-1-0.onrender.com/factorize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: matrix })
    });

    const factorizeData = await factorizeResponse.json();

    document.getElementById('resultOutput').textContent = `
Average: ${factorizeData.average}
Is Diagonal: ${factorizeData.isDiagonal}
Max: ${factorizeData.max}
Min: ${factorizeData.min}
Total Sum: ${factorizeData.totalSum}
    `;

    const rotatedMatrix = factorizeData.rotated_matrix.map(row => row.join(' ')).join('\n');
    document.getElementById('matrixOutput').textContent = rotatedMatrix;

    alert('Factorize operation successful!');
});

document.getElementById('rotateBtn').addEventListener('click', async () => {
    const matrix = JSON.parse(document.getElementById('matrixInput').value);
    const token = localStorage.getItem('token');

    const rotateResponse = await fetch('https://go-app-1-0.onrender.com/getRotateMatriz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: matrix })
    });

    const rotateData = await rotateResponse.json();

    // Mostrar la matriz rotada de forma bonita
    const rotatedMatrix = rotateData.rotated_matrix.map(row => row.join(' ')).join('\n');
    document.getElementById('matrixOutput').textContent = rotatedMatrix;
});
