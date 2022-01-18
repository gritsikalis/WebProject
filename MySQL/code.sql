CREATE TABLE `users` (
    `username` varchar(100) not null,
    `password` varchar(100) not null,
    `email` varchar(100) not null,
    `isAdmin` TINYINT(1) not null,
    `userId` int(1000) auto_increment,
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


CREATE TABLE `popular_times` (
    `id` int(10) not null auto_increment,
    `poi_id` int(10) not null,
    `day` varchar(100) not null,
    `hour00` int(3) not null,
    `hour01` int(3) not null,
    `hour02` int(3) not null,
    `hour03` int(3) not null,
    `hour04` int(3) not null,
    `hour05` int(3) not null,
    `hour06` int(3) not null,
    `hour07` int(3) not null,
    `hour08` int(3) not null,
    `hour09` int(3) not null,
    `hour10` int(3) not null,
    `hour11` int(3) not null,
    `hour12` int(3) not null,
    `hour13` int(3) not null,
    `hour14` int(3) not null,
    `hour15` int(3) not null,
    `hour16` int(3) not null,
    `hour17` int(3) not null,
    `hour18` int(3) not null,
    `hour19` int(3) not null,
    `hour20` int(3) not null,
    `hour21` int(3) not null,
    `hour22` int(3) not null,
    `hour23` int(3) not null,
    PRIMARY KEY (`poi_id`),
    CONSTRAINT f1 FOREIGN KEY (poi_id) REFERENCES poi (id) ON DELETE RESTRICT ON UPDATE CASCADE
)


