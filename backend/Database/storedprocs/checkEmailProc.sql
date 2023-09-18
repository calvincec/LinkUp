CREATE OR ALTER PROCEDURE checkEmailProc (@email VarChar(255))
AS
BEGIN
    SELECT email FROM users WHERE email = @email
END