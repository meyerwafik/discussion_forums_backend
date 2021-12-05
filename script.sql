DROP TABLE courses;
DROP TABLE discussions;
DROP TABLE comments;
DROP TABLE users;

CREATE TABLE courses(
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    courseName VARCHAR(255),
    courseDescription VARCHAR(1300),
    createdAt TIMESTAMP,
    updatedAt timestamp,
    PRIMARY KEY(courseId)
);

CREATE TABLE discussions (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    courseId INT NOT NULL,
    title VARCHAR(75),
    discDescription VARCHAR(1300),
    createdAt TIMESTAMP, 
    updatedAt timestamp,
    PRIMARY KEY(discussionId),
    FOREIGN KEY(courseId) REFERENCES courses(courseId)
);

CREATE TABLE comments  (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    discussionId INT NOT NULL,
    authorName VARCHAR(255),
    content VARCHAR(1300),
    createdAt TIMESTAMP,
    PRIMARY KEY(commentId),
    FOREIGN KEY(discussionId) REFERENCES discussions(discussionId)
);	

CREATE TABLE users  (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    studentName VARCHAR(255),
    email VARCHAR(255)UNIQUE ,
    pwHash VARCHAR(1000) NOT NULL,
    userRole CHAR(60) NOT NULL,
    token VARCHAR(1000),
    PRIMARY KEY(id)
);

INSERT INTO courses(courseName , courseDescription , createdAt )
VALUES("Programming 1","This course focuses on the basics of the structured programming. The aim of this course is to make the students familiar with the basics of the structured programming with C++ using practical approaches. /n Tutor: Prof. Mahmoud Yasser , Eng. Khaled Mansour" , current_timestamp());

INSERT INTO courses (courseName , courseDescription , createdAt )
VALUES("Programming 2","The course's focus is on the basics of the Object Oriented programming. The course's aim is to make the students familiar with the basics of the Object Oriented programming with Java using practical approaches(hands-on project.) /n Tutor: Prof. Yasser Hessien , Eng. Mansour Aboud" , current_timestamp());

INSERT INTO courses (courseName , courseDescription , createdAt )
VALUES("Object Oriented Analysis and Design","This course focuses in depth on the Objected Oriented Analysis and Design. The aim of this course is to make the students more experienced with the Object Oriented Analysis and Design using a project consisting of back-end and front-end. /n Tutor: Prof. Karim Emara , Eng. Sally Gendy" , current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(0, "Pointers : Assignment 3","Discussion regarding the use of pointers in assignment 3", current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(0, "Arrays : Assignment 2","Discussion regarding the use of arrays in assignment 2", current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(1, "ArrayLists : Assignment 3","Discussion regarding the ArrayLists in assignment 3", current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(1, "Arrays : Assignment 2","Discussion regarding java arrays in assignment 2", current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(2, "Activity Diagram : Assignment 3","Discussion regarding the activity diagram in assignment 3", current_timestamp());

INSERT INTO discussions (courseId, title, discDescription , createdAt)
VALUES(2, "OOD Principles: Assignment 1","Discussion regarding the OOD principles in assignment 1", current_timestamp());

INSERT INTO users ( studentName , email , pwHash, userRole)
VALUES("Youssef Magdy","youssef.magdy@gmail.com", 'mypassword' ,"Student");

INSERT INTO users ( studentName , email , pwHash, userRole)
VALUES("Meyer Wafik","meyer.wafik@gmail.com","meyerspassword","Student");

INSERT INTO users ( studentName , email , pwHash, userRole)
VALUES("Marina Hany","marina.hany@gmail.com","password","Tutor");
