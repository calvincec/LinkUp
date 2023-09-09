const {Router} = require('express');
const { newuser, loginuser, updateuser, otherUsers, deleteUser, followUser, userViewAllFollowers, following, peopleymk } = require('../controllers/usercontroller');

const userrouter = Router()

userrouter.post('/register', newuser);
userrouter.post('/login', loginuser);
userrouter.put('/updateuser/:userid', updateuser);
userrouter.get('/otherusers/:userid', otherUsers);
userrouter.put('/delete/:userid',deleteUser)
userrouter.post('/follow', followUser)
userrouter.get('/allfollowers/:userid', userViewAllFollowers)
userrouter.get('/following/:userid', following)
userrouter.get('/peopleymk/:userid', peopleymk)



module.exports = {
    userrouter
}