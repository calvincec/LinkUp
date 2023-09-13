CREATE OR ALTER PROCEDURE userLogin(@email VarChar(255))
AS
    BEGIN
        SELECT * FROM users where email=@email and isdeleted = 0
    END