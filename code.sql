-- FOR EVERY TABLE IN OUR DATABASE

CREATE TABLE `users` (
    `username` varchar(100) not null,
    `password` varchar(100) not null,
    `email` varchar(100) not null,
    `isAdmin` TINYINT(1) not null,
    `userId` INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`userId`)
)

CREATE TABLE `poi` (
    `poi_id:` varchar(100) not null,
    `name:` varchar(100) not null,
    `types:` varchar(100) not null,
    `address:` varchar(100) not null,
    `coordinates:` POINT not null, -- //string η POINT dataType
    `pupularTimes` JSON not null, -- enas allos tropos *
    PRIMARY KEY (`poi_id`)
)

CREATE TABLE `visits` ( 
    `username` VARCHAR(100) NOT NULL , 
    `poi` VARCHAR(100) NOT NULL , 
    `timestamp` TIMESTAMP NOT NULL ,
    `est_numberofpeople` INT NOT NULL , 
    `visit_id` INT NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (visit_id) 
) ENGINE = InnoDB;


CREATE TABLE `case_reports` (
  `username` varchar(100) NOT NULL,
  `First name` varchar(100) NOT NULL,
  `Last name` varchar(100) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
