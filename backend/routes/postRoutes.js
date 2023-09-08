const {Router} = require('express');
const { newPost, getAllPosts, currentUserPost, deletePost, updatePost } = require('../controllers/postsController');

const postRouter = Router()

postRouter.post('/new', newPost);
postRouter.get('/all', getAllPosts)
postRouter.get('/currentuser/:userid', currentUserPost)
postRouter.put('/delete/:postid', deletePost)
postRouter.put('/update/:postid', updatePost)



module.exports = {
    postRouter
}