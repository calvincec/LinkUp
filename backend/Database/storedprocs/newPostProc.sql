CREATE OR ALTER PROCEDURE newPostProc(@postid VARCHAR(255),@userid VARCHAR(255),@postwords VARCHAR(1000),@postpic VARCHAR(255))
AS
BEGIN
    INSERT INTO posts(postid,userid,postwords,postpic)
    VALUES(@postid,@userid,@postwords,@postpic)
END