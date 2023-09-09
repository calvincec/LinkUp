CREATE OR ALTER PROCEDURE followUserProc(@followid VarChar(255), @userid VarChar(255), @followerid VarChar(255))
AS 
    BEGIN
        INSERT INTO follow(followid, userid, followerid)
        VALUES(@followid , @userid, @followerid)
    END