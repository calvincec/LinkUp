CREATE OR ALTER PROCEDURE changepwd(@email VarChar(255), @password VarChar(255))
AS
BEGIN
    UPDATE users SET password = @password WHERE email = @email
END


select * from users

EXECUTE changepwd '127b0227-57e0-415e-8f75-f1f81827b047', '$2b$05$ALztTlc3t8J0gGSAxSBjHeh7YgmuqWgCKH4KoqGtoPSq/mp0Gy72S';

$2b$05$ALztTlc3t8J0gGSAxSBjHeh7YgmuqWgCKH4KoqGtoPSq/mp0Gy72S