CREATE OR ALTER PROCEDURE userLogin(@email VarChar(255))
AS
    BEGIN
        SELECT password FROM users where email=@email
    END