CREATE OR ALTER PROCEDURE updateUserProc(@userid VARCHAR(255) , @profilepic VARCHAR(255) ,@bio VARCHAR(255), @username VARCHAR(100) ,@email VARCHAR(255) )
AS
    BEGIN
        UPDATE users SET userid= @userid, profilepic = @profilepic,bio=@bio,username=@username,email=@email
        WHERE userid= @userid and isdeleted = 0
    END