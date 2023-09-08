CREATE OR ALTER PROCEDURE registerUserProc(@userid VarChar(255), @profilepic VarChar(255), @bio VarChar(255), @username VarChar(100), @email VarChar(255), @password VarChar(255))
AS
    BEGIN
        INSERT INTO users(userid,profilepic, bio, username, email, password)
        VALUES(@userid, @profilepic, @bio, @username, @email, @password)
    END





