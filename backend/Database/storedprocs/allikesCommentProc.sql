CREATE OR ALTER PROCEDURE allikesCommentProc(@commentid VarChar(255))
AS 
BEGIN
    SELECT COUNT(*) as allikes FROM commentlikes WHERE commentid = @commentid
END
