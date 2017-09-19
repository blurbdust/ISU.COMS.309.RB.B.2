CREATE TABLE users (
	ID MEDIUMINT NOT NULL AUTO_INCREMENT, /* The user ID.  Starts at 1 and increments from there.*/
	Username varchar(25) NOT NULL,
	Password varchar(40) NOT NULL,
	UserRole TINYINT NOT NULL, /* Integer representing user role. 1 = admin, 2 = Driver, 3 = Camera/Shooter,  4 = Spectator */
    DisplayName varchar(25),
    Bio varchar(140), /* Bio of player, with imposed 140-character limit */
	PRIMARY KEY (ID)
);