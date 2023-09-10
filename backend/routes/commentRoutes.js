const {Router} = require('express');
const { newComment, deleteComment, getComment, likeComment, unlikeComment, allikesComment } = require('../controllers/commentsController');
const { tokenVerfying } = require('../Middleware/verifyToken');



const commentRouter = Router()

commentRouter.post('/new',tokenVerfying, newComment)
commentRouter.put('/delete/:commentid',tokenVerfying, deleteComment)
commentRouter.get('/pcid/:id',tokenVerfying, getComment)
commentRouter.post('/like',tokenVerfying, likeComment)
commentRouter.delete('/unlike/:likeid', tokenVerfying, unlikeComment)
commentRouter.get('/allikes/:commentid',tokenVerfying, allikesComment)




module.exports = {
    commentRouter
}