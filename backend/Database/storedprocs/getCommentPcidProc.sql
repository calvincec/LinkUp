CREATE OR ALTER PROCEDURE getCommentPcidProc(@id VarChar(255))
AS
BEGIN
    SELECT * FROM comment WHERE (postid = @id OR parentcomment = @id) AND isdeleted = 0
END