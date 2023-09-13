CREATE OR ALTER PROCEDURE unlikePostProc(@userid VarChar(255), @postid VarChar(255))
AS
BEGIN
    DELETE FROM postlikes WHERE postid=@postid AND userid = @userid
END


-- CREATE OR ALTER PROCEDURE unlikePostProc(@likeid VarChar(255))
-- AS
-- BEGIN
--     DELETE FROM postlikes WHERE likeid=@likeid
-- END