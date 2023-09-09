CREATE OR ALTER PROCEDURE likeComment(@likeid VarChar(255), @commentid VarChar(255),@userid VarChar(255))
AS
BEGIN
    INSERT INTO commentlikes(likeid, commentid,userid)
    VALUES (@likeid, @commentid,@userid)
END