CREATE OR ALTER PROCEDURE otherUsersProc(@userid VARCHAR(255))
AS
    BEGIN
        SELECT userid, username, profilepic, bio, createdat, email FROM users WHERE userid <> @userid and isdeleted = 0
    END
