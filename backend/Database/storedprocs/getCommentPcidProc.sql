CREATE OR ALTER PROCEDURE getCommentPcidProc(@id VarChar(255))
AS
BEGIN
    SELECT commentid, postid, commentbdy, userid, parentcomment FROM comment WHERE ((postid = @id OR parentcomment = @id) AND isdeleted = 0)
END