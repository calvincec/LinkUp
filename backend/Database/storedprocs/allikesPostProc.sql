CREATE OR ALTER PROCEDURE allikesPostProc(@postid VarChar(255))
AS 
BEGIN
    SELECT COUNT(*) as allikes FROM postlikes WHERE postid = @postid
END