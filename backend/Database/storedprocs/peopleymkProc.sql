CREATE OR ALTER PROCEDURE peopleymkProc(@userid VarChar(255))
AS 
BEGIN 
    SELECT u.userid,  u.profilepic, u.bio, u.username, u.email, u.createdat
    FROM users u
    LEFT JOIN follow f ON u.userid = f.userid
    WHERE (u.isdeleted = 0 AND (f.userid IS NULL)
    AND  u.userid <> @userid);
END



SELECT TOP 5 "userid", "profilepic", "bio", "username", "email", "createdat" FROM users WHERE userid<>@userid  AND isdeleted = 0;