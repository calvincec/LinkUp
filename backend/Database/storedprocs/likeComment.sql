CREATE OR ALTER PROCEDURE likeComment(@likeid VarChar(255), @commentid VarChar(255),@userid VarChar(255))
AS
BEGIN
    IF (SELECT isdeleted FROM users WHERE userid=@userid)=0
    BEGIN
        INSERT INTO commentlikes(likeid, commentid,userid)
        VALUES (@likeid, @commentid,@userid)
    END  
END