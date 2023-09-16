const { config } = require('dotenv');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');
const {v4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { newuserValidator } = require('../Validators/allValidator.js');
const { loginuserValidator } = require('../Validators/allValidator.js');
const { updateuserValidator } = require('../Validators/allValidator.js');
const { followuserValidator } = require('../Validators/allValidator.js');
dotenv.config()
const { SECRET } = process.env;

const newuser = async(req,res)=>{
    try {
        // let myvar = 'kj'
        
        // for (let i = 0; i<50; i++){
        //     myvar+=' '
        //     myvar+='word'
        // }
        // console.log(myvar);
        // const bio = myvar
        const userid = v4()
        const {profilepic, bio, username, email, password} = req.body
        
        const {error}=newuserValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const hashedPwd = await bcrypt.hash(password, 5)
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            
            const out = await pool.request()
            .input('userid', mssql.VarChar, userid)
            .input('profilepic', mssql.VarChar, profilepic)
            .input('bio', mssql.VarChar, bio)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar,hashedPwd )
            .execute('registerUserProc')

            if(out.rowsAffected==1){  
                return res.status(200).json({
                    message: "User registered successfully",
                })}
            else{
                    return res.status(400).json({error: "User not registered successfully"})
            }
            
        }
    } catch (error) {
        
        if (error.message.includes('Violation of UNIQUE KEY')) {
          return res.status(400).json({ error: "The email you have entered exists, log in instead?" });
        }
        // if (error.code.includes('EPARAM')) {
        //     return res.status(400).json({ error: "Kindly input the correct parameters" });
        // }
        if (error.message.includes('truncated')) {
            if (error.message.includes('bio')){
                return res.status(400).json({ error: "Ensure the bio does not exceed 255 characters" });
            }
            if (error.message.includes('profilepic')){
                return res.status(400).json({ error: "Ensure the profilepic link does not exceed 255 characters" });
            }
            if (error.message.includes('username')){
                return res.status(400).json({ error: "Ensure the username does not exceed 255 characters" });
            }
            if (error.message.includes('email')){
                return res.status(400).json({ error: "Ensure the email does not exceed 255 characters" });
            }
            if (error.message.includes('password')){
                return res.status(400).json({ error: "Ensure the password does not exceed 20 characters" });
            }
          }
        // return res.status(400).json({error: error})
        return res.status(500).json({ error: 'Internal server error' });
      }
    }      
const loginuser = async(req,res)=>{
    try {
        const {email, password} = req.body

        const {error}=loginuserValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const pool  = await mssql.connect(sqlConfig)
        const user = (await pool.request().input('email', mssql.VarChar, email).execute('userLogin')).recordset[0]

        // console.log(user);
        
        
        if(user){
            const hashedPwd = user.password
            const comparePwd = await bcrypt.compare(password, hashedPwd)
            if(comparePwd){
                const {password, isdeleted,...payload}=user  
                const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '36000s'}) 
                // console.log(payload);
                return res.status(200).json({
                    message : "Logged in",
                    token
                })
            }else{
                return res.status(400).json({
                    error: 'Wrong password'
                })
            }
        }else{
            return res.status(400).json({error: "Email does not exist in our current records, consider registering"})
        }
        
    } catch (error) {
        return res.status(404).json({error: 'kindly input the right credentials'})
    }
}

const updateuser = async(req,res)=>{
    
    try {
        const { username, email, bio, profilepic} = req.body

        const {error}=updateuserValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const userid = req.params.userid
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            const out = await pool.request()
            .input('userid', mssql.VarChar, userid)
            .input('profilepic', mssql.VarChar, profilepic)
            .input('bio', mssql.VarChar, bio)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .execute('updateUserProc')
            
            
            if(out.rowsAffected==1){  
                return res.status(200).json({
                    message: "Details updated successfully",
                })}
            else{
                    return res.status(400).json({error: "The user you have entered does not exist"})
            }
        }
   
    } catch (error) {
        if (error.message.includes('Violation of UNIQUE KEY')) {
            return res.status(404).json({ error: "There is a user who is using this email, kindly use another email or log in again" });
        }
        // if (error.code.includes('EPARAM')) {
        //     return res.status(404).json({ error: "Kindly input the correct parameters" });
        // }
        if (error.message.includes('truncated')) {
            if (error.message.includes('bio')){
                return res.status(400).json({ error: "Ensure the bio does not exceed 255 characters" });
            }
            if (error.message.includes('profilepic')){
                return res.status(400).json({ error: "Ensure the profilepic link does not exceed 255 characters" });
            }
            if (error.message.includes('username')){
                return res.status(400).json({ error: "Ensure the username does not exceed 255 characters" });
            }
            if (error.message.includes('email')){
                return res.status(400).json({ error: "Ensure the email does not exceed 255 characters" });
            }
        }
        // return res.status(500).json({ error: 'Internal server error' });
        return res.status(404).json({error})
    }
}

const otherUsers = async(req,res)=>{
    try {
        const userid = req.params.userid
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            const out = await pool.request()
            .input('userid',userid)
            .execute('otherUsersProc');
            
            const otherusers = out.recordset
            return res.status(200).json({otherusers: otherusers})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUser = async(req,res)=>{
    try {
        const userid = req.params.userid
        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userid',userid)
        .execute('deleteUserProc');

        if(out.rowsAffected[0]>=1){  
            return res.status(200).json({
                message: "user deleted successfully",
            })}
        else{
                return res.status(400).json({Error: "The user you have entered does not exist"})
        }
        
    } catch (error) {
        return res.status(404).json({error})
    }
}

const followUser = async (req,res)=>{
    try {
        const {userid, followerid} = req.body

        const {error}=followuserValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const followid = v4()
        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('followid', mssql.VarChar, followid)
        .input('userid', mssql.VarChar, userid)
        .input('followerid', mssql.VarChar, followerid)
        .execute('followUserProc');

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "user followed",
            })}
        else{
                return res.status(400).json({error: "user not followed"})
        }

    } catch (error) {
        if (error.message.includes('FOREIGN KEY')) {
            return res.status(404).json({error: "The user does not exist in the records"})
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const userViewAllFollowers = async(req,res)=>{
    try {
        const userid = req.params.userid

        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userid', mssql.VarChar, userid)
        .execute('userViewAllFollowersProc');

        const followers = out.recordset

        return res.status(200).json({followers: followers})


        
    } catch (error) {
        return res.status(404).json({error})
    }
}

const unfollow = async(req, res)=>{
    try {
        const {userid, followerid} = req.body

        const {error}=followuserValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userid', mssql.VarChar, userid)
        .input('followerid', mssql.VarChar, followerid)
        .execute('unfollowProc');

        if(out.rowsAffected>=1){  
            return res.status(200).json({
                message: "user unfollowed",
            })}
        else{
                return res.status(400).json({error: "user does not exist"})
        }

    } catch (error) {
        return res.json({Error: error})
        // return res.status(500).json({ error: 'Internal server error' });
    }
}

const following = async(req,res)=>{
    try {
        const userid = req.params.userid

        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userid', mssql.VarChar, userid)
        .execute('followingProc');

        const following = out.recordset

        return res.status(200).json({following: following})
    } catch (error) {
        return res.status(404).json({error})
    }
}

const peopleymk = async(req, res)=>{
    try {
        const userid = req.params.userid

        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userid', mssql.VarChar, userid)
        .execute('peopleymkProc');

        const peopleymk = out.recordset

        return res.status(200).json({peopleymk: peopleymk})
    } catch (error) {
        return res.status(404).json({error})
    }
}



const checkToken = async(req,res)=>{
    if(req.info){
        // console.log("reaches here");
        return res.status(200).json({
            userdet: req.info
        })
    }
    else{
        return res.json({
            error: "nothing found"
        })
    }
}




module.exports = {
    newuser, following,
    loginuser, userViewAllFollowers,
    updateuser, peopleymk,
    otherUsers, checkToken,
    deleteUser, unfollow,
    followUser
}