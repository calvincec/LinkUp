CREATE OR ALTER PROCEDURE unlikeCommentProc(@likeid VarChar(255))
AS
BEGIN
    DELETE FROM commentlikes WHERE likeid=@likeid
END