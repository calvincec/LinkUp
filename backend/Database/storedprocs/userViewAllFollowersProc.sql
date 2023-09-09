CREATE OR ALTER PROCEDURE userViewAllFollowersProc(@userid VarChar(255))
AS BEGIN
    SELECT DISTINCT followerid FROM follow WHERE userid = @userid
END

SELECT * FROM users 