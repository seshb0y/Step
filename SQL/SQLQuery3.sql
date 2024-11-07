--CREATE DATABASE Hospital;
--go
use Hospital;

--База данных Больница (Hospital) содержит информацию 
--о проводимых в больнице обследованиях.
--Обследования, проводимые в больнице представлены 
--в  виде таблицами Обследования (Examinations) и Врачи 
--и  обследования (DoctorsExaminations), в которых собрана 
--основная информация, такая как: название обследования, 
--день недели, в который оно проводится, а также время начала и завершения.
--Также в базе данных присутствуют информация о персонале больницы, которая хранится в таблице Врачи (Doctors). 
--Данные об отделениях и палатах содержатся в таблицах Отделения (Departments) и Палаты (Wards) соответственно


--CREATE TABLE Departments
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Building int NOT NULL CHECK(Building >=1 and Building <= 5),
--	Name nvarchar(100) NOT NULL CHECK(Name != '') UNIQUE
--);

--INSERT INTO Departments values
--(1, 'Traumatology'),
--(2, 'Infectious'),
--(3, 'Neurosurgical'),
--(4, 'Maternity'),
--(5, 'Burns')

--CREATE TABLE Doctors
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Name nvarchar(max) NOT NULL CHECK(Name != ''),
--	Premium money NOT NULL CHECK(Premium>=0) DEFAULT 0,
--	Salary money NOT NULL CHECK(Salary>0),
--	Surname nvarchar(max) NOT NULL CHECK(Surname!='')
--);
--INSERT INTO Doctors values
--('John', 500, 1000, 'Hiltop'),
--('Bill', 600, 1500, 'Harington'),
--('Alisia', 300, 800, 'Burns'),
--('Fred', 100, 500, 'Mercury'),
--('Andreas', 900, 2000, 'Jackovich')

--CREATE TABLE Wards
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Name nvarchar(20) NOT NULL CHECK(Name != '') UNIQUE,
--	Places int NOT NULL CHECK(Places>0),
--	DepartmentId int NOT NULL,
--	FOREIGN KEY (DepartmentId) REFERENCES Departments (ID),
--);
--INSERT INTO Wards values
--('Pulmonological ', 15, 4),
--('Physiotherapeutic', 45, 2),
--('X-ray', 5, 3),
--('Endoscopic', 35, 1),
--('Dental', 75, 5)

--CREATE TABLE Examinations
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	Name nvarchar(100) NOT NULL CHECK(Name != '') UNIQUE,
--);

--INSERT INTO Examinations values
--('Traumatological'),
--('Infectious'),
--('Neurosurgical'),
--('Maternity'),
--('Burn')

--CREATE TABLE DoctorsExaminations
--(
--	Id int PRIMARY KEY IDENTITY NOT NULL,
--	StartTime time NOT NULL CHECK(StartTime >= '08:00:00' and StartTime <= '18:00:00'),
--	EndTime time NOT NULL,
--	CHECK(EndTime > StartTime),
--	Name nvarchar(100) NOT NULL CHECK(Name != ''),
--	DoctorId int NOT NULL,
--	ExaminationId int NOT NULL,
--	WardId int NOT NULL,
--	FOREIGN KEY (DoctorId) REFERENCES Doctors (ID),
--	FOREIGN KEY (ExaminationId) REFERENCES Examinations (ID),
--	FOREIGN KEY (WardId) REFERENCES Wards (ID)
--);

--INSERT INTO DoctorsExaminations values
--('10:00:00', '10:30:00', 'Traumatological examination', 3, 1, 1),
--('15:25:00', '16:20:00', 'Infectious examination', 1, 2, 2),
--('08:00:00', '09:00:00', 'Neurosurgical examination', 5, 3, 3),
--('12:00:00', '13:40:00', 'Maternity examination', 2, 4, 4),
--('14:00:00', '17:45:00', 'Burn examination', 1, 5, 5),
--('10:20:00', '10:50:00', 'Traumatological examination', 3, 1, 1),
--('16:00:00', '16:20:00', 'Infectious examination', 3, 2, 2),
--('08:30:00', '09:30:00', 'Neurosurgical examination', 5, 3, 3),
--('10:00:00', '13:30:00', 'Maternity examination', 5, 4, 4),
--('14:50:00', '17:45:00', 'Burn examination', 4, 5, 5),
--('13:00:00', '17:30:00', 'Traumatological examination', 1, 1, 1),
--('17:25:00', '18:50:00', 'Infectious examination', 2, 2, 2),
--('11:45:00', '14:00:00', 'Neurosurgical examination', 4, 3, 3),
--('13:00:00', '13:40:00', 'Maternity examination', 1, 4, 4),
--('10:00:00', '17:45:00', 'Burn examination', 3, 5, 5)
