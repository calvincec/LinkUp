const {Router} = require('express');
const { newComment, deleteComment, getComment, likeComment, unlikeComment, allikesComment } = require('../controllers/commentsController');



const commentRouter = Router()

commentRouter.post('/new', newComment)
commentRouter.put('/delete/:commentid', deleteComment)
commentRouter.get('/pcid/:id', getComment)
commentRouter.post('/like', likeComment)
commentRouter.delete('/unlike/:likeid', unlikeComment)
commentRouter.get('/allikes/:commentid', allikesComment)




module.exports = {
    commentRouter
}