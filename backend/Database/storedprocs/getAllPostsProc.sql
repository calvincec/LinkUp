CREATE OR ALTER PROCEDURE getAllPostsProc
    AS
    BEGIN
        SELECT * FROM posts WHERE isdeleted = 0
    END