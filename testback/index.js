const express = require('express')
const app = express()
const port = 8000
app.get('/',(req,res) => {
    return res.send("home")
});

app.get('/login',(req,res) => {
    return res.send("login")
});

app.get('/logout',(req,res) => {
    return res.send("logout")
});


app.listen(port,() => {
    console.log("Server is Running...")
});






// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))