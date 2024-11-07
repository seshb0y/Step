--use stepdb;

--create table Marks
--(
--	Id int PRIMARY KEY IDENTITY,
--	StudentId int,
--	MarkValue int,
--	Comment nvarchar(100),
--	--FOREIGN KEY (StudentId) REFERENCES Students (ID),
--	CONSTRAINT FK_Marks_To_Students FOREIGN KEY (StudentId) REFERENCES Students(ID)
--);


--Необходимо создать базу данных Больница (Hospital), которая будет содержать информацию о проводимых в больнице обследованиях.
--Обследования, проводимые в больнице представлены 
--в виде таблицы Обследования (Examinations), в которой собрана основная информация, такая как: название обследования, день недели, в который оно проводится, а также время начала и завершения.
--Также в базе данных присутствуют информация о персонале больницы, которая хранится в таблице Врачи (Doctors). 
--Данные об отделениях и заболеваниях содержатся в таблицах Отделения (Departments) и Заболевания (Diseases) соответственно.

--CREATE DATABASE Hospital;
use Hospital;



CREATE TABLE Departments
(
	Id int PRIMARY KEY IDENTITY NOT NULL,
	Building int NOT NULL CHECK(Building >=1 and Building <= 5),
	Financing money NOT NULL CHECK(Financing >= 0) DEFAULT 0,
	Name nvarchar(100) NOT NULL CHECK(Name != '') UNIQUE
);


CREATE TABLE Diseases
(
	Id int PRIMARY KEY IDENTITY NOT NULL,
	Name nvarchar(100) NOT NULL CHECK(Name != '') UNIQUE,
	Severity int NOT NULL CHECK(Severity >= 1) DEFAULT 1
);

CREATE TABLE Doctors
(
	Id int PRIMARY KEY IDENTITY NOT NULL,
	Name nvarchar(max) NOT NULL CHECK(Name != ''),
	Phone char(10) NULL,
	Salary money NOT NULL CHECK(Salary>0),
	Surname nvarchar(max) NOT NULL CHECK(Surname!='')
);

CREATE TABLE Patients
(
	Id int PRIMARY KEY IDENTITY NOT NULL,
	Name nvarchar(max) NOT NULL CHECK(Name != ''),
	Surname nvarchar(max) NOT NULL CHECK(Surname!='')
);

CREATE TABLE Examinations
(
	Id int PRIMARY KEY IDENTITY NOT NULL,
	DayOfWeek int CHECK(DayOfWeek >=1 and DayOfWeek <= 7),
	StartTime time NOT NULL CHECK(StartTime >= '08:00:00' and StartTime <= '18:00:00'),
	EndTime time NOT NULL CHECK(EndTime > '08:00:00' and EndTime < '18:00:00'),
	Name nvarchar(100) NOT NULL CHECK(Name != ''),
	DoctorId int,
	DiseaseId int,
	DepartmentId int,
	PatientId int,
	FOREIGN KEY (DoctorId) REFERENCES Doctors (ID),
	FOREIGN KEY (DiseaseId) REFERENCES Diseases (ID),
	FOREIGN KEY (DepartmentId) REFERENCES Departments (ID),
	FOREIGN KEY (PatientId) REFERENCES Patients (ID),
);