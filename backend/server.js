const express = require('express');
const { userrouter } = require('./routes/userroutes');
const { postRouter } = require('./routes/postRoutes');
// const { projectrouter } = require('./Routes/projectRoutes');

const app = express()

app.use(express.json())
// app.use('/project', projectrouter)
app.use('/user', userrouter)
app.use('/post', postRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(4600, ()=>{
    console.log('Server running on port 4600');
})