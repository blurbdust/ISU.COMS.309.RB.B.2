CREATE TABLE users (
	ID INT NOT NULL IDENTITY(1,1), /* The user ID.  Starts at 1 and increments from there.*/
	Username varchar(25) NOT NULL,
	Password varchar(40) NOT NULL,
	UserRole [int] NOT NULL, /* Integer representing user role. 1 = admin, 2 = Driver, 3 = Camera/Shooter,  4 = Spectator */
	PRIMARY KEY (ID)
);