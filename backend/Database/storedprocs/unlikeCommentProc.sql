CREATE OR ALTER PROCEDURE unlikeCommentProc(@userid VarChar(255), @commentid VarChar(255))
AS
BEGIN
    DELETE FROM commentlikes WHERE commentid=@commentid AND userid = @userid
END









-- CREATE OR ALTER PROCEDURE unlikeCommentProc(@likeid VarChar(255))
-- AS
-- BEGIN
--     DELETE FROM commentlikes WHERE likeid=@likeid
-- END