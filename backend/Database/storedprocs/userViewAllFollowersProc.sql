CREATE OR ALTER PROCEDURE userViewAllFollowersProc(@userid VarChar(255))
AS BEGIN
    SELECT DISTINCT f.followerid, u.username, u.bio, u.email, u.profilepic FROM follow f
    JOIN users u on u.userid = f.followerid
    WHERE f.userid = @userid
END

SELECT * FROM users 