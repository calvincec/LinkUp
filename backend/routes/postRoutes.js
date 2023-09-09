const {Router} = require('express');
const { newPost, getAllPosts, currentUserPost, deletePost, updatePost, likePost, unlikePost, allikesPost } = require('../controllers/postsController');

const postRouter = Router()

postRouter.post('/new', newPost);
postRouter.get('/all', getAllPosts)
postRouter.get('/currentuser/:userid', currentUserPost)
postRouter.put('/delete/:postid', deletePost)
postRouter.put('/update/:postid', updatePost)
postRouter.post('/like', likePost)
postRouter.delete('/unlike/:likeid', unlikePost)
postRouter.get('/allikes/:postid', allikesPost)


module.exports = {
    postRouter
}