CREATE OR ALTER PROCEDURE followingProc(@userid VarChar(255))
AS 
    BEGIN
        SELECT DISTINCT userid from follow WHERE followerid = @userid
    END