
const mssql = require('mssql');
const {v4} = require('uuid');
const { sqlConfig } = require('../Config/config');

const newPost = async(req,res)=>{
    try {
        const { userid, postwords, postpic} = req.body
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
                return res.status(400).json({message: "post not added successfully"})
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

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "post deleted successfully",
            })}
        else{
                return res.status(400).json({message: "The post does not exist"})
        }

    } catch (error) {
        // return res.status(500).json({ error: 'Internal server error' });
        return res.status(404).json({Error:error}) 
    }
}
const updatePost = async(req,res)=>{
    try {
        const postid = req.params.postid
        const{postwords, postpic} = req.body
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
                return res.status(400).json({message: "The post does not exist"})
        }

        
    } catch (error) {
        return res.status(404).json({Error:error}) 
    }
}

module.exports = {
    newPost,
    getAllPosts,
    currentUserPost,
    deletePost,
    updatePost
}