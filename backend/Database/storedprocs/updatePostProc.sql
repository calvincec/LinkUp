CREATE OR ALTER PROCEDURE updatePostProc(@postid VarChar(255), @postpic VarChar(255), @postwords VarChar(1000))
AS
BEGIN
 UPDATE posts set postwords=@postwords, postpic=@postpic
 WHERE postid=@postid AND isdeleted = 0
END