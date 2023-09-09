CREATE OR ALTER PROCEDURE deletePostsProc(@postid VarChar(255))
AS
    BEGIN
        -- DELETE FROM posts WHERE postid = @postid
        UPDATE posts set isdeleted = 1 WHERE (postid=@postid AND isdeleted = 0)
        UPDATE comment set isdeleted = 1 WHERE (postid=@postid AND isdeleted = 0)
        DELETE FROM postlikes WHERE postid=@postid
    END