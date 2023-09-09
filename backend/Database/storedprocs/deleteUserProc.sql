CREATE OR ALTER PROCEDURE deleteUserProc(@userid VarChar(255))
AS
    BEGIN
        UPDATE users set isdeleted = 1 WHERE userid=@userid AND isdeleted = 0
        DELETE FROM follow WHERE userid=@userid
        UPDATE comment set isdeleted = 1 WHERE userid=@userid AND isdeleted = 0
        DELETE FROM posts WHERE userid=@userid
        DELETE FROM postlikes WHERE userid=@userid
        DELETE FROM commentlikes WHERE userid=@userid
    END