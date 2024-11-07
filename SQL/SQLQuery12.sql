--SELECT TOP (1000) [Id]
--      ,[Date]
--      ,[DiseaseId]
--      ,[DoctorId]
--      ,[ExaminationId]
--      ,[WardId]
--  FROM [Hospital].[dbo].[DoctorsExaminations]

--1. Вывести названия и вместимости палат, расположенных
--в 5-м корпусе, вместимостью 5 и более мест, если в этом
--корпусе есть хотя бы одна палата вместимостью более
--15 мест.
--SELECT Departments.Building Building, Wards.Name Name, Wards.Places Places
--FROM Wards 
--JOIN Departments
--ON Wards.DepartmentId = Departments.Id
--WHERE Departments.Building = 5 and Wards.Places > 5;

--2. Вывести названия отделений в которых проводилось
--хотя бы одно обследование за последнюю неделю.
--SELECT Wards.Name Name, DoctorsExaminations.Date Date
--FROM Wards 
--JOIN DoctorsExaminations
--ON Wards.Id = DoctorsExaminations.WardId
--WHERE DoctorsExaminations.Date >= '25-07-2024';

--3. Вывести названия заболеваний, для которых не проводятся обследования.
--SELECT Diseases.Name Name, DoctorsExaminations.Date 'Не проводится обследование'
--FROM Diseases
--JOIN DoctorsExaminations
--ON Diseases.Id = DoctorsExaminations.DiseaseId
--WHERE DoctorsExaminations.Date = '01.08.2024';


--4. Вывести полные имена врачей, которые не проводят
--обследования.
--SELECT Doctors.Name Name, Doctors.Surname Surname, DoctorsExaminations.Date 'Не проводится обследование'
--FROM DoctorsExaminations
--JOIN Doctors
--ON DoctorsExaminations.DoctorId = Doctors.Id
--WHERE DoctorsExaminations.Date = '01.08.2024';

--5. Вывести названия отделений, в которых не проводятся
--обследования.
--SELECT Wards.Name Name, DoctorsExaminations.Date 'Не проводится обследование'
--FROM Wards 
--JOIN DoctorsExaminations
--ON Wards.Id = DoctorsExaminations.WardId
--WHERE DoctorsExaminations.Date >= '01.08.2024';

--6. Вывести фамилии врачей, которые являются интернами.
--SELECT Doctors.Surname Surname, Interns.Id ID
--FROM Doctors
--JOIN Interns
--ON Doctors.Id = Interns.DoctorId

--7. Вывести фамилии интернов, ставки которых больше,
--чем ставка хотя бы одного из врачей.
--SELECT Interns.Id ID, Doctors.Surname Surname, Doctors.Salary Salary
--FROM Doctors
--JOIN Interns
--ON Doctors.Id = Interns.DoctorId
--WHERE Doctors.Salary > 500

--8. Вывести названия палат, чья вместимость больше, чем
--вместимость каждой палаты, находящейся в 3-м корпусе.
--SELECT Wards.Name, Wards.Places, Departments.Building
--FROM Departments
--JOIN Wards
--ON Wards.DepartmentId = Departments.Id

--9. Вывести фамилии врачей, проводящих обследования в
--отделениях “Ophthalmology” и “Physiotherapy”.
--SELECT Doctors.Surname, DoctorsExaminations.DoctorId, DoctorsExaminations.WardId, Wards.Name
--FROM DoctorsExaminations
--JOIN Doctors
--ON Doctors.Id = DoctorsExaminations.DoctorId
--JOIN Wards
--ON Wards.Id = DoctorsExaminations.WardId
--WHERE Wards.Name = 'Pulmonological' or Wards.Name = 'Endoscopic'

--10. Вывести названия отделений, в которых работают интерны и профессоры.
--SELECT Wards.Name Name
--FROM Wards
--JOIN DoctorsExaminations
--ON DoctorsExaminations.WardId = Wards.Id
--JOIN Doctors
--ON DoctorsExaminations.DoctorId = Doctors.Id
--JOIN Interns
--ON Doctors.Id = Interns.DoctorId
--JOIN Professors
--ON Doctors.Id = Professors.DoctorId or Doctors.Id = Interns.DoctorId

--11. Вывести полные имена врачей и отделения в которых
--они проводят обследования, если отделение имеет фонд
--финансирования более 20000.
--SELECT Doctors.Name, Doctors.Surname, Wards.Name, Departments.Financing
--FROM Doctors
--JOIN DoctorsExaminations
--ON DoctorsExaminations.DoctorId = DoctorId
--JOIN Wards
--ON Wards.Id = DoctorsExaminations.WardId
--JOIN Departments
--ON Departments.Id = Wards.DepartmentId
--WHERE Departments.Financing > 20000

--12. Вывести название отделения, в котором проводит обследования врач с наибольшей ставкой.
--SELECT MAX(Doctors.Salary), Wards.Name
--FROM Doctors
--JOIN DoctorsExaminations
--ON DoctorsExaminations.DoctorId = Doctors.Id
--JOIN Wards
--ON DoctorsExaminations.WardId = Wards.Id
--GROUP BY Wards.Name

--13. Вывести названия заболеваний и количество проводимых по ним обследований.
--SELECT Diseases.Name, Count(*) Count
--FROM DoctorsExaminations
--JOIN Diseases
--ON Diseases.Id = DoctorsExaminations.DiseaseId
--GROUP BY Diseases.Name
