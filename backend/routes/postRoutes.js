const {Router} = require('express');
const { newPost, getAllPosts, currentUserPost, deletePost, updatePost, likePost, unlikePost, allikesPost, getOnePost } = require('../controllers/postsController');
const { tokenVerfying } = require('../Middleware/verifyToken');

const postRouter = Router()

postRouter.post('/new', newPost);
postRouter.get('/all/:userid', getAllPosts)
postRouter.get('/currentuser/:userid',tokenVerfying, currentUserPost)
postRouter.put('/delete/:postid', deletePost)
postRouter.put('/update/:postid',tokenVerfying, updatePost)
postRouter.post('/like', likePost)
// postRouter.delete('/unlike/:likeid',tokenVerfying, unlikePost)
postRouter.get('/allikes/:postid',tokenVerfying, allikesPost)
postRouter.put('/one/:postid', getOnePost)


module.exports = {
    postRouter
}