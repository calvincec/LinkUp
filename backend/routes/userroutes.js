const {Router} = require('express');
const { newuser, loginuser, updateuser, otherUsers, deleteUser } = require('../controllers/usercontroller');

const userrouter = Router()

userrouter.post('/register', newuser);
userrouter.post('/login', loginuser);
userrouter.put('/updateuser/:userid', updateuser);
userrouter.get('/otherusers/:userid', otherUsers);
userrouter.put('/delete/:userid',deleteUser)



module.exports = {
    userrouter
}