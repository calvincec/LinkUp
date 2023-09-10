const {Router} = require('express');
const { newPost, getAllPosts, currentUserPost, deletePost, updatePost, likePost, unlikePost, allikesPost } = require('../controllers/postsController');
const { tokenVerfying } = require('../Middleware/verifyToken');

const postRouter = Router()

postRouter.post('/new',tokenVerfying, newPost);
postRouter.get('/all', getAllPosts)
postRouter.get('/currentuser/:userid',tokenVerfying, currentUserPost)
postRouter.put('/delete/:postid',tokenVerfying, deletePost)
postRouter.put('/update/:postid',tokenVerfying, updatePost)
postRouter.post('/like',tokenVerfying, likePost)
postRouter.delete('/unlike/:likeid',tokenVerfying, unlikePost)
postRouter.get('/allikes/:postid',tokenVerfying, allikesPost)


module.exports = {
    postRouter
}