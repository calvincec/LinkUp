CREATE OR ALTER PROCEDURE peopleymkProc(@userid VarChar(255))
AS 
BEGIN 
    SELECT TOP 5 "userid", "profilepic", "bio", "username", "email", "createdat" FROM users WHERE userid<>@userid  AND isdeleted = 0;
END