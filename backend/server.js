const app = require('./app');
const port = 3000;

app.get('/', (req, res) => {
    res.send('User Management System Backend');
});

app.listen(port, '0.0.0.0')
    console.log(`Server running at http://0.0.0.0:${port}`);
