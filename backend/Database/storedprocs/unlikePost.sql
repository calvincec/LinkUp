CREATE OR ALTER PROCEDURE unlikePostProc(@likeid VarChar(255))
AS
BEGIN
    DELETE FROM postlikes WHERE likeid=@likeid
END