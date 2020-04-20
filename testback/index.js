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


// Admin route...
// app.get("/admin", (req,res) => {
//     return res.send("This is the admin")

// });
const isAdmin = (req,res,next) => {
    console.log("isAdimin is running.")
    next();
}
// check for logged in
const isLoggedin = (req,res,next) => {
    console.log("isLoggedin")
    next();
}


const admin = (req,res) => {
    return res.send("This is admin......!")
};

app.get("/admin",isAdmin,isLoggedin,admin)

