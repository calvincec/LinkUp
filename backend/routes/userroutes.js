const {Router} = require('express');
const { newuser, loginuser, updateuser, otherUsers, deleteUser, followUser, userViewAllFollowers, following, peopleymk, checkToken, unfollow, changepwd, getOneUser, checkEmail } = require('../controllers/usercontroller');
const { tokenVerfying } = require('../Middleware/verifyToken');

const userrouter = Router()

userrouter.post('/register', newuser);
userrouter.post('/login', loginuser);
userrouter.put('/updateuser/:userid', updateuser);
userrouter.get('/otherusers/:userid',tokenVerfying, otherUsers);
userrouter.put('/delete/:userid',tokenVerfying,deleteUser)
userrouter.post('/follow',tokenVerfying, followUser)
userrouter.get('/allfollowers/:userid',tokenVerfying, userViewAllFollowers)
userrouter.get('/following/:userid',tokenVerfying, following)
userrouter.get('/peopleymk/:userid',tokenVerfying, peopleymk)
userrouter.get('/tokencheck',tokenVerfying, checkToken)
userrouter.put('/unfollow', tokenVerfying, unfollow)
userrouter.put('/changepwd/:email', changepwd)
userrouter.get('/one/:userid', getOneUser)
userrouter.get('/checkemail/:email', checkEmail)


module.exports = {
    userrouter
}