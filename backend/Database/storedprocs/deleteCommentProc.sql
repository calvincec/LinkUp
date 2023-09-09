CREATE OR ALTER PROCEDURE deleteCommentProc(@commentid VarChar(255))
AS
BEGIN
    UPDATE comment set isdeleted = 1 WHERE commentid=@commentid AND isdeleted = 0
    DELETE FROM commentlikes WHERE commentid=@commentid
END