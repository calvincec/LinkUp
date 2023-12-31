CREATE OR ALTER PROCEDURE getCommentPcidProc(@id VarChar(255), @userid VarChar(255))
AS
BEGIN
		SELECT c.commentid, c.postid, c.commentbdy, c.userid, u.username , u.profilepic, c.parentcomment, c.createdat, (select userid from commentlikes where userid = @userid and commentid = c.commentid) as curuserliked, COUNT(l.likeid) AS likes FROM comment c 
		JOIN users u ON u.userid = c.userid
		LEFT JOIN commentlikes l ON l.commentid = c.commentid
		WHERE ((c.postid = @id OR c.parentcomment = @id) AND c.isdeleted = 0) AND u.isdeleted=0
		GROUP BY c.createdat, c.commentid, c.postid, c.commentbdy, c.userid, u.username , u.profilepic, c.parentcomment
		ORDER BY c.createdat DESC;
END





		SELECT c.commentid, c.postid, c.commentbdy, c.userid, u.username , u.profilepic, c.parentcomment, c.createdat, (select userid from commentlikes where userid = @userid and commentid = c.commentid) as curuserliked, COUNT(l.likeid) AS likes FROM comment c 
		JOIN users u ON u.userid = c.userid
		LEFT JOIN commentlikes l ON l.commentid = c.commentid
		WHERE ((c.postid = @id OR c.parentcomment = @id) AND c.isdeleted = 0) AND u.isdeleted=0
		GROUP BY c.createdat, c.commentid, c.postid, c.commentbdy, c.userid, u.username , u.profilepic, c.parentcomment
		ORDER BY c.createdat DESC;







SELECT c.commentid, c.postid, c.commentbdy, c.userid, u.username , u.profilepic, c.parentcomment FROM comment c 
    JOIN
        users u ON u.userid = c.userid
    WHERE ((c.postid = @id OR c.parentcomment = @id) AND c.isdeleted = 0) AND u.isdeleted=0