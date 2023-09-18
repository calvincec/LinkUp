const express = require('express');
const { userrouter } = require('./routes/userroutes');
const { postRouter } = require('./routes/postRoutes');
const { commentRouter } = require('./routes/commentRoutes');
// const { projectrouter } = require('./Routes/projectRoutes');
const cors = require('cors');
const { updatepwd } = require('./routes/updatePwd');
const app = express()

app.use(express.json())
// app.use('/project', projectrouter)
app.use(cors());
app.use('/user', userrouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/reset', updatepwd)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(4600, ()=>{
    console.log('Server running on port 4600');
})