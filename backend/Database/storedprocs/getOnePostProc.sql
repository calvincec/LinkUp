CREATE OR ALTER PROCEDURE getOnePostProc(@postid VarChar(255), @userid Varchar(255))
AS
    BEGIN
        SELECT p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic,  (select userid from postlikes where userid = @userid and postid = p.postid) as curuserliked, COUNT(l.likeid) AS likes, COUNT(m.postid) AS comments  FROM posts p
        JOIN
        users u on u.userid = p.userid
        LEFT JOIN postlikes l ON l.postid = p.postid
        LEFT JOIN comment m ON m.postid = p.postid
        WHERE     p.postid = @postid
        GROUP BY p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic
    END



    SELECT p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic  FROM posts p
     JOIN
     users u on u.userid = p.userid
     WHERE     postid = @postid