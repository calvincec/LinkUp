CREATE OR ALTER PROCEDURE likePost(@likeid VarChar(255), @postid VarChar(255),@userid VarChar(255))
AS
BEGIN
    INSERT INTO postlikes(likeid, postid,userid)
    VALUES (@likeid, @postid,@userid)
END