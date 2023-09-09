CREATE TABLE "posts"(
    "postid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "userid" VARCHAR(255) NOT NULL,
    "postwords" VARCHAR(1000) NULL,
    "postpic" VARCHAR(255) NULL,
    "createdat" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isdeleted" BIT DEFAULT 0
);


CREATE TABLE "commentlikes"(
    "likeid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "commentid" VARCHAR(255) NULL,
    "userid" VARCHAR(255) NOT NULL
);


CREATE TABLE "users"(
    "userid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "profilepic" VARCHAR(255) NULL,
    "bio" VARCHAR(255) NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdat" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isdeleted" BIT DEFAULT 0
);


CREATE TABLE "postlikes"(
    "likeid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "postid" VARCHAR(255) NOT NULL,
    "userid" VARCHAR(255) NOT NULL
);


CREATE TABLE "follow"(
    "followid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "userid" VARCHAR(255) NOT NULL,
    "followerid" VARCHAR(255) NOT NULL
);


CREATE TABLE "comment"(
    "commentid" VARCHAR(255) PRIMARY KEY NOT NULL,
    "postid" VARCHAR(255) NULL,
    "commentbdy" VARCHAR(1000) NOT NULL,
    "userid" VARCHAR(255) NOT NULL,
    "parentcomment" VARCHAR(255) NULL,
    "isdeleted" BIT DEFAULT 0
);





ALTER TABLE
    "comment" ADD CONSTRAINT "comment_parentcomment_foreign" FOREIGN KEY("parentcomment") REFERENCES "comment"("commentid");

ALTER TABLE
    "comment" ADD CONSTRAINT "comment_postid_foreign" FOREIGN KEY("postid") REFERENCES "posts"("postid")
	ON UPDATE CASCADE
	ON DELETE CASCADE;


ALTER TABLE
    "postlikes" ADD CONSTRAINT "postlikes_postid_foreign" FOREIGN KEY("postid") REFERENCES "posts"("postid")
	ON UPDATE CASCADE
	ON DELETE CASCADE;

ALTER TABLE
    "posts" ADD CONSTRAINT "posts_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid")
	ON UPDATE CASCADE
	ON DELETE CASCADE;

ALTER TABLE
    "follow" ADD CONSTRAINT "follow_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid")
	ON UPDATE CASCADE
	ON DELETE CASCADE;

ALTER TABLE
    "commentlikes" ADD CONSTRAINT "commentlikes_commentid_foreign" FOREIGN KEY("commentid") REFERENCES "comment"("commentid")
	ON UPDATE CASCADE
	ON DELETE CASCADE;

ALTER TABLE
    "commentlikes" ADD CONSTRAINT "commentlikes_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid");
	

ALTER TABLE
    "postlikes" ADD CONSTRAINT "postlikes_userid_foreign" FOREIGN KEY("userid") REFERENCES "users"("userid");

ALTER TABLE
    "follow" ADD CONSTRAINT "follow_followerid_foreign" FOREIGN KEY("followerid") REFERENCES "users"("userid")