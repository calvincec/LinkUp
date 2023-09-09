const mssql = require('mssql');
const {v4} = require('uuid');
const { sqlConfig } = require('../Config/config');

const newComment = async(req,res)=>{
    try {
        const commentid = v4()
        const {postid, commentbdy, userid, parentcomment} = req.body

        const pool  = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('commentid', mssql.VarChar, commentid)
        .input('postid', mssql.VarChar, postid)
        .input('commentbdy', mssql.VarChar, commentbdy)
        .input('userid', mssql.VarChar, userid)
        .input('parentcomment', mssql.VarChar, parentcomment)
        .execute('newCommentProc')

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "Comment added successfully",
        })}
        else{
            return res.status(400).json({message: "Comment not added"})
        }


    } catch (error) {
        return res.status(200).json({Error: error})
    }
}

const deleteComment = async(req, res)=>{
    try {
        const commentid = req.params.commentid
        const pool = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('commentid', mssql.VarChar, commentid)
        .execute('deleteCommentProc')

        if(out.rowsAffected[0]>=1){  
            return res.status(200).json({
                message: "Comment deleted successfully",
        })}
        else{
            return res.status(400).json({error: "Comment not found"})
        }
    } catch (error) {
        return res.status(200).json({Error: error})
    }
}

const getComment = async(req,res)=>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getCommentPcidProc')

        const comments = out.recordset
        return res.status(200).json({comments: comments})


    } catch (error) {
        return res.status(200).json({Error: error})
    }
}

const likeComment = async(req,res)=>{
    try {
        const {commentid, userid} = req.body
        const likeid = v4()
        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('likeid', mssql.VarChar, likeid)
        .input('commentid', mssql.VarChar, commentid)
        .input('userid', mssql.VarChar, userid)
        .execute('likeComment')

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "comment Liked successfully",
            })}
        else{
                return res.status(400).json({message: "The comment is not liked"})
        }

    } catch (error) {
        return res.status(404).json({Error:error}) 
    }
}

const unlikeComment = async(req,res)=>{
    try {
        const likeid = req.params.likeid

        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('likeid', mssql.VarChar, likeid)
        .execute('unlikeCommentProc')

        if(out.rowsAffected==1){  
            return res.status(200).json({
                message: "comment disLiked successfully",
            })}
        else{
                return res.status(400).json({message: "The like is not found"})
        }
    } catch (error) {
        return res.status(404).json({Error:error}) 
    }
}

const allikesComment = async(req,res)=>{
    try {
        const commentid = req.params.commentid

        const pool  = await mssql.connect(sqlConfig)
        let out = await pool.request()
        .input('commentid', mssql.VarChar, commentid)
        .execute('allikesCommentProc')

  
        console.log(out); 


        out = out.recordset[0].allikes
       
        return res.status(200).json({allCommentLikes: out})

    } catch (error) {
        return res.status(404).json({Error:error}) 
    }
} 

module.exports = {
    newComment,
    deleteComment,
    allikesComment,
    getComment,
    likeComment,
    unlikeComment
}