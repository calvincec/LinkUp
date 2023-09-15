CREATE OR ALTER PROCEDURE followingProc(@userid VarChar(255))
AS 
    BEGIN
        SELECT DISTINCT f.userid,  u.username, u.bio, u.email, u.profilepic from follow f 
        JOIN users u on u.userid = f.userid
        WHERE followerid = @userid
    END