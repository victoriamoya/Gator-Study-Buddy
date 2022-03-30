if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    }
    
    const express = require('express')
    const bodyParser = require("body-parser")
    const jwt = require("jsonwebtoken")
    const bcrypt = require("bcrypt")
    const User = require("./models/user.js")
    const app = express()
    const expressLayouts = require('express-ejs-layouts')
    
    const indexRouter = require('./routes/index')
    app.use('/', indexRouter)
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/views')
    app.set('layout', 'layouts/layout')
    app.use(expressLayouts)
    app.use(express.static('public'))
    app.use(express.json({
        type: ['application/json', 'text/plain']
    }))
    
    app.set('layout', 'layouts/layout')
    
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = process.env.uri
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    app.listen(process.env.PORT || 9000)
    
    app.get('/express_backend', (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    });
    
    app.post("/register", async (req, res, next) => {
        await client.connect();
        const database = client.db("testUserAuth");
        const users = database.collection("users")
        const user = req.body
        console.log(req.body);
    
        // check if user exists in database
        const takenUsername = await users.findOne({username: req.body.username})
        const takenEmail = await users.findOne({email: req.body.email})
    
        if (takenUsername || takenEmail) {
            res.json({message: "Username or email already registered. Please choose another valid username."})
        } else {
            user.password = await bcrypt.hash(req.body.password, 10)
    
            const dbUser = new User({
                username: req.body.username.toLowerCase(),
                email: req.body.email.toLowerCase(),
                password: req.body.password
            })
    
    
            const result = await users.insertOne(dbUser);
            res.json({message: "User saved to database."})
        }
        await client.close()
    })
    
    app.post("/login", async (req, res) => {
        await client.connect();
        const database = client.db("testUserAuth");
        const users = database.collection("users")
        const userLogin = req.body;
        User.findOne({username: userLogin.username}).then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid login."
                })
            }
    
            bcrypt.compare(userLogin.password, dbUser.password).then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                    }
                    jwt.sign(
                        payload, process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            if (err) return res.json({message: err})
                            return res.json({
                                message: "Login Successful",
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    return res.json({
                        message: "Invalid Username or Password"
                    })
                }
            })
        })
        await client.close()
    })
    
    function verifyToken(req, res, next) {
        const token = req.headers["x-access-token"]?.split(' ')[1]
        if(token) {
            jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
                if (err) return res.json({
                    isLoggedIn: false,
                    message: "Failed to authenticate token"
                })
    
                req.user = {};
                req.user.id = decoded.id
                req.user.username = decoded.username
                next()
            })
        } else {
            res.json({message: "Invalid Token", isLoggedIn: false})
        }
    }
    
    app.get("/getUsername", verifyToken, (req, res) => {
        res.json({isLoggedIn: true, username: req.user.username})
    })
    
    // async function run() {
    //     try {
    //         await client.connect();
    //         const database = client.db("testUserAuth");
    //         const users = database.collection("users")
    //
    //         //const result = await users.insertOne(dbUser);
    //
    //     } finally {
    //         await client.close();
    //     }
    // }
    // run().catch(console.dir);