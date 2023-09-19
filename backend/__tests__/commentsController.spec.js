import mssql from 'mssql'
import {v4 as uuid} from 'uuid';
import { allikesComment, deleteComment, getComment, newComment } from '../controllers/commentsController';

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}

jest.mock('uuid', ()=>({v4: (()=> '123456789')}))

describe('add new comment', ()=>{
    const req = {
        body: {
            postid: "380f14f4-9ded-4706-871e-1d4b8237a3ad",
            commentbdy: "jdhchdkc",
            userid: "127b0227-57e0-415e-8f75-f1f81827b047",
            parentcomment: "f4f1ecfd-ae1d-4079-9c28-adc69d1e705b"       
        }
    }

    it('should add a new comment successfully', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await newComment(req,res)
        expect(mockedInput).toHaveBeenCalledWith('commentid', mssql.VarChar, '123456789')
        expect(mockedInput).toHaveBeenCalledWith('postid', mssql.VarChar, req.body.postid)
        expect(mockedInput).toHaveBeenCalledWith('commentbdy', mssql.VarChar, req.body.commentbdy)
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.body.userid)
        expect(mockedInput).toHaveBeenCalledWith('parentcomment', mssql.VarChar, req.body.parentcomment)

        expect(res.json).toHaveBeenCalledWith({message: "Comment added successfully"})
        expect(res.status).toHaveBeenCalledWith(200)
    })

        it('should fail to comment', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await newComment(req,res)
        expect(mockedInput).toHaveBeenCalledWith('commentid', mssql.VarChar, '123456789')
        expect(mockedInput).toHaveBeenCalledWith('postid', mssql.VarChar, req.body.postid)
        expect(mockedInput).toHaveBeenCalledWith('commentbdy', mssql.VarChar, req.body.commentbdy)
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.body.userid)
        expect(mockedInput).toHaveBeenCalledWith('parentcomment', mssql.VarChar, req.body.parentcomment)
        expect(mockedExecute).toHaveBeenCalledWith('newCommentProc')

        expect(res.json).toHaveBeenCalledWith({message: "Comment not added"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})

describe('delete one comment', ()=>{
    const req = {
        params: {commentid: 'samplecommentid'}
    }

    it('delete a comment successfully', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await deleteComment(req,res)

        expect(res.json).toHaveBeenCalledWith({message: "Comment deleted successfully"})
        expect(res.status).toHaveBeenCalledWith(200)
        expect(mockedInput).toHaveBeenCalledWith('commentid', mssql.VarChar, req.params.commentid)
        expect(mockedExecute).toHaveBeenCalledWith('deleteCommentProc')
    })

        it('Fail to delete a comment since it is not available', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await deleteComment(req,res)

        expect(res.json).toHaveBeenCalledWith({error: "Comment not found"})
        expect(res.status).toHaveBeenCalledWith(400)

    })
})

describe('get comment', ()=>{
    const req = {
        params: {id: 'idsample'},
        body: {userid: 'sampleuserid'}
    }
    const comments= [
        {
          commentid: "4b5041d8-d945-43d4-b5ee-756ecd5eabbe",
          postid: "380f14f4-9ded-4706-871e-1d4b8237a3ad",
          commentbdy: "hey you",
          userid: "88223715-2535-4a23-a25e-c8446f2d86e5",
          username: "Daniel",
          profilepic: "http://res.cloudinary.com/dzuzy670c/image/upload/v1695044555/ebic5f1h5o6u1bh3yik8.jpg",
          parentcomment: null,
          createdat: "2023-09-18T16:45:51.943Z",
          curuserliked: null,
          likes: 0
        },
        {
          commentid: "d8668c61-e66b-4d05-841a-b5461e3ff710",
          postid: "380f14f4-9ded-4706-871e-1d4b8237a3ad",
          commentbdy: "it seems james is joking",
          userid: "7fc2346a-bc0b-41fd-878c-d348e203fcff",
          username: "Kevo guy",
          profilepic: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
          parentcomment: null,
          createdat: "2023-09-14T14:33:27.130Z",
          curuserliked: "7fc2346a-bc0b-41fd-878c-d348e203fcff",
          likes: 1
        }
    ]
    it('should get one comment', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: comments})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await getComment(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({comments: comments})
    })
})

// describe('like comment', ()=>{

// })

describe('get all likes for a comment', ()=>{
    it('gets all likes for a comment', async()=>{
        const req = {
        params: {commentid: "commentid"}
        }
        const out = [{allikes: 6}]
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: out})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        } 
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await allikesComment(req, res)    

        expect(res.json).toHaveBeenCalledWith({allCommentLikes: out[0].allikes})
        expect(res.status).toHaveBeenCalledWith(200)
    })

})