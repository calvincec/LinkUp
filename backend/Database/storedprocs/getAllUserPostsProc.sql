CREATE OR ALTER PROCEDURE getAllUserPostsProc(@userid VarChar(255))
AS
BEGIN
    SELECT * FROM posts WHERE userid=@userid AND isdeleted = 0
END