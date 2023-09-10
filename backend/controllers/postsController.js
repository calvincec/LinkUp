
const mssql = require('mssql');
const {v4} = require('uuid');
const { sqlConfig } = require('../Config/config');
const { newPostValidator } = require('../Validators/userValidator');
const { updatePostValidator } = require('../Validators/userValidator');
const { likePostValidator } = require('../Validators/userValidator');

const newPost = async(req,res)=>{
    try {
        const { userid, postwords, postpic} = req.body

        const {error}=newPostValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const postid = v4()
        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('postid', mssql.VarChar, postid)
        .input('userid', mssql.VarChar, userid)
        .input('postwords', mssql.VarChar, postwords)
        .input('postpic', mssql.VarChar, postpic)
        .execute('newPostProc')

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "post added successfully",
            })}
        else{
                return res.status(400).json({message: "The user does not exist in our records"})
        }

    } catch (error) {
        if (error.message.includes('FOREIGN KEY')) {
            return res.status(404).json({ error: "The user does not exist in our records" });
        }
        if (error.code.includes('EPARAM')) {
            return res.status(404).json({ error: "Kindly input the correct parameters" });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllPosts = async(req, res)=>{
    try {
        const pool  = await mssql.connect(sqlConfig)
        let out = await (pool.request()
        .execute('getAllPostsProc'))

        out = out.recordset
       
        return res.status(200).json({allPosts: out})
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
        // return res.status(404).json({Error:error})
    }
}

const currentUserPost = async(req,res)=>{
    try {
        const userid = req.params.userid
        const pool  = await mssql.connect(sqlConfig)
        let out = await (pool.request()
        .input('userid', mssql.VarChar, userid)
        .execute('getAllUserPostsProc'))

        out = out.recordset
       
        return res.status(200).json({alluserPosts: out})
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
        // return res.status(404).json({Error:error})
    }
}
const deletePost = async(req,res)=>{
    try {
        const postid = req.params.postid
        const pool  = await mssql.connect(sqlConfig)
        let out = await (pool.request()
        .input('postid', mssql.VarChar, postid)
        .execute('deletePostsProc'))

        if(out.rowsAffected[0]>=1){  
            return res.status(200).json({
                message: "post deleted successfully",
            })}
        else{
                return res.status(400).json({message: "The post does not exist"})
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
        // return res.status(404).json({Error:error}) 
    }
}
const updatePost = async(req,res)=>{
    try {
        const postid = req.params.postid
        const{postwords, postpic} = req.body

        const {error}=updatePostValidator.validate(req.body)
        if(error){
            return res.status(422).json({error: error.details[0].message})
        }

        const pool  = await mssql.connect(sqlConfig)
        let out = await (pool.request()
        .input('postpic', mssql.VarChar, postpic)
        .input('postwords', mssql.VarChar, postwords)
        .input('postid', mssql.VarChar, postid)
        .execute('updatePostProc'))

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "post updated successfully",
            })}
        else{
                return res.status(400).json({error: "The post does not exist"})
        }

        
    } catch (error) {
        // return res.status(404).json({Error:error}) 
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const likePost = async(req,res)=>{
    try {
        const {postid, userid} = req.body

        const likeid = v4()
        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('likeid', mssql.VarChar, likeid)
        .input('postid', mssql.VarChar, postid)
        .input('userid', mssql.VarChar, userid)
        .execute('likePost')

        if(out.rowsAffected>=1){  
            return res.status(200).json({
                message: "post Liked successfully",
            })}
        else{
                return res.status(400).json({message: "The user does not exist"})
        }

    } catch (error) {
        if (error.message.includes('FOREIGN KEY')) {
            return res.status(404).json({error: "The user or post does not exist in the records"})
        }
        // return res.status(404).json({Error:error})
        return res.status(500).json({ error: 'Internal server error' }); 
    }
}

const unlikePost = async(req,res)=>{
    try {
        const likeid = req.params.likeid

        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('likeid', mssql.VarChar, likeid)
        .execute('unlikePostProc')

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "post disLiked successfully",
            })}
        else{
                return res.status(400).json({message: "The like is not found"})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' }); 
    }
}

const allikesPost = async(req,res)=>{
    try {
        const postid = req.params.postid
    
        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('postid', mssql.VarChar, postid)
        .execute('allikesPostProc')


        out = out.recordset[0].allikes
       
        return res.status(200).json({allPostLikes: out})

    } catch (error) {
        return res.status(404).json({Error:error}) 
    }
}

module.exports = {
    newPost,
    getAllPosts,
    currentUserPost,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    allikesPost
}