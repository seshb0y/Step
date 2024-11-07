--ASANXidmet.
--Chelovek mojet ne imet ZagranPassportn i Shexsiyyet (Udostoverenie lichnosti), Nedvijemoe imuwestvo i dvijemoye imuwestvo
--Esli Chelovek imyet kakoy libo imuwestvo (mawina libo dom), doljen bit dokument
--u etogo imuwestva, a takje Ministerstvo kotoroye vidalo etot dokument.
 
 
--Doljnie tablici.
--Persons
--LocalPassmort
--ForeignPassmort
--RealEstate
--Transport (dvijemoye imuwestvo)
--Structures (Ministerstva)
--Documents
 
--SOZDAT Dopolnitelnie tablici dla svazey mnogie_ko_mnogim esli est nujda. 
--CREATE DATABASE ASANXidmet;
--go
USE AsanXidmet;

--CREATE TABLE Structures
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Name nvarchar(30) NOT NULL UNIQUE CHECK(Name != ''),
--);
--INSERT INTO Structures values
--('ASAN Xidmet'),
--('ÌÂÄ'),
--('ÌÈÄ');


--CREATE TABLE Documents
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Number int NOT NULL UNIQUE,
--	StructureId int NOT NULL,
--	FOREIGN KEY (StructureId) REFERENCES Structures(Id)
----);
--INSERT INTO Documents values
--(1565, 2)


--CREATE TABLE Transport
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Car_Name nvarchar(50) NOT NULL CHECK(Car_Name != ''),
--	Year int NOT NULL,
--	Price money NOT NULL,
--	DocumentId int NOT NULL UNIQUE,
--	FOREIGN KEY (DocumentId) REFERENCES Documents(Id)
--);
--INSERT INTO Transport values
--('Bugatti', 2017, 8000, 16),
--('Porshe', 2020, 15000, 17),
--('BMW',2007, 3000, 18);


--CREATE TABLE Real_Estate
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Type nvarchar(30) NOT NULL CHECK(Type != ''),
--	Area int NOT NULL,
--	Adress nvarchar(50) NOT NULL CHECK(Adress != ''),
--	DocumentId int NOT NULL UNIQUE,
--	FOREIGN KEY (DocumentId) REFERENCES Documents(Id)
--);
--INSERT INTO Real_Estate values
----('Apartment', 75, 'Some street 1', 4),
----('House', 125, 'Some street 2', 5),
----('Office', 250, 'Some street 3', 6),
--('Apartment', 45, 'Some street 4', 13),
--('House', 100, 'Some street 5', 14),
--('Office', 96, 'Some street 6', 15)


--CREATE TABLE Local_Pass
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Number int UNIQUE NOT NULL,
--	StructureId int NOT NULL,
--	FOREIGN KEY (StructureId) REFERENCES Structures(Id)
--);
--INSERT INTO Local_Pass values
--(651613, 1),
--(654513, 2),
--(542133, 3),
--(654321, 2),
--(987451, 3),
--(132498, 1)

--CREATE TABLE Foreign_Pass
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Number int UNIQUE NOT NULL,
--	StructureId int NOT NULL,
--	FOREIGN KEY (StructureId) REFERENCES Structures(Id)
--);
--INSERT INTO Foreign_Pass values
--(124126, 3),
--(654323, 1),
--(987465, 2),
--(135465, 2),
--(239854, 3),
--(816564, 1)


--CREATE TABLE Person
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Name nvarchar(30) NOT NULL CHECK(Name != ''),
--	Surname nvarchar(30) NOT NULL CHECK(Surname != ''),
--	Age int NOT NULL,
--	Local_Pass_Id int UNIQUE NOT NULL,
--	Foreign_Pass_Id int UNIQUE  NOT NULL,
--	Real_Estate_Id int UNIQUE NOT NULL,
--	Transport_Id int UNIQUE NOT NULL,
--);
--INSERT INTO Person values
--('John', 'Silverhand', 25, 9, 5, 2, 13),
--('Andrey', 'Bogachov', 25, 10, 6, 3, 19),
--('John', 'Silverhand', 25, 11, 7, 4, 14),
--('John', 'Silverhand', 25, 12, 8, 9, 20),
--('John', 'Silverhand', 25, 13, 9, 10, 15),
--('John', 'Silverhand', 25, 14, 10, 11, 21);