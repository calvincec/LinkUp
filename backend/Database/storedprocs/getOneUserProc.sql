CREATE OR ALTER PROCEDURE getOneUserProc(@userid VarChar(255))
AS
BEGIN
    SELECT userid, profilepic, bio, username, email FROM users WHERE userid = @userid
END


SELECT * FROM users