CREATE OR ALTER PROCEDURE newCommentProc(@commentid VarChar(255), @postid VarChar(255), @commentbdy VarChar(1000), @userid VarChar(255), @parentcomment VarChar(255))
AS 
    BEGIN
        INSERT INTO comment(commentid, postid, commentbdy, userid, parentcomment)
        VALUES (@commentid, @postid, @commentbdy, @userid, @parentcomment)
    END