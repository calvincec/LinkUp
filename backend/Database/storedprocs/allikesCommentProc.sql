CREATE OR ALTER PROCEDURE allikesCommentProc(@commentid VarChar(255))
AS 
BEGIN
    SELECT COUNT(*) as allikes FROM commentlikes WHERE commentid = @commentid
END

SELECT * from users where userid= '127b0227-57e0-415e-8f75-f1f81827b047'