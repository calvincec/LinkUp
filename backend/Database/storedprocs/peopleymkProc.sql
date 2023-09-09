CREATE OR ALTER PROCEDURE peopleymkProc(@userid VarChar(255))
AS 
BEGIN 
    SELECT TOP 5 * FROM users WHERE userid<>@userid;
END