CREATE OR ALTER PROCEDURE getAllPostsProc(@userid Varchar(255))
    AS
    BEGIN
        SELECT p.postid, p.userid, u.username, u.profilepic, p.postwords, (select userid from postlikes where userid = @userid and postid = p.postid) as curuserliked, COUNT(l.likeid) AS likes, COUNT(m.postid) AS comments, p.postpic
        FROM posts p
        JOIN users u ON u.userid = p.userid
        LEFT JOIN postlikes l ON l.postid = p.postid
		LEFT JOIN comment m ON m.postid = p.postid
        WHERE p.isdeleted = 0 AND u.isdeleted = 0
        GROUP BY p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic;
    END







        SELECT p.postid, p.userid, u.username, u.profilepic, p.postwords, COUNT(l.likeid) AS likes, COUNT(m.postid) AS comments, p.postpic
        FROM posts p
        JOIN users u ON u.userid = p.userid
        LEFT JOIN postlikes l ON l.postid = p.postid
		LEFT JOIN comment m ON m.postid = p.postid
        WHERE p.isdeleted = 0 AND u.isdeleted = 0
        GROUP BY p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic;


    


    
        SELECT p.postid, p.userid, u.username, u.profilepic, p.postwords, COUNT(l.likeid) AS likes, p.postpic
        FROM posts p
        JOIN users u ON u.userid = p.userid
        LEFT JOIN postlikes l ON l.postid = p.postid
        WHERE p.isdeleted = 0 AND u.isdeleted = 0
        GROUP BY p.postid, p.userid, u.username, u.profilepic, p.postwords, p.postpic;