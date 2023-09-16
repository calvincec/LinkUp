CREATE OR ALTER PROCEDURE unfollowProc(@userid Varchar(255), @followerid Varchar(255))
AS
    BEGIN
        DELETE FROM follow where userid = @userid and followerid = @followerid
    END