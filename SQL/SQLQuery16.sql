--1) Pokazat Customerov kotorie imyeut BonusCard
--SELECT Name, Surname 
--FROM Customers
--JOIN BonusCard
--ON Customers.BonusCardId = BonusCard.Id


--2) Pokazat Customerov u kotorix Bonusi v Bonus carde previwayut 100.
--SELECT Name, Surname, BonusCard.BonusQuant
--FROM Customers
--JOIN BonusCard
--ON Customers.BonusCardId = BonusCard.Id
--WHERE BonusCard.BonusQuant > 100


--3) Pokazat Custemorev kotorie pokupali elektroniku
--SELECT Name, Surname, OrderDetailsProducts.ElectronicId 
--FROM Customers
--JOIN OrderDetails
--ON OrderDetails.CustomerId = CustomerId
--JOIN OrderDetailsProducts
--ON OrderDetailsProducts.Id = OrderDetails.OrderProductId
--WHERE OrderDetailsProducts.ElectronicId >= 0


--4) Pokazat Customerov kotorie sdelali xotyabi odnu pokupku na summu bolshe 1000 azn
--SELECT Customers.Name, Customers.Surname, ELectronics.Price, Products.Price
--FROM Customers
--JOIN OrderDetails
--ON OrderDetails.CustomerId = CustomerId
--JOIN OrderDetailsProducts
--ON OrderDetailsProducts.Id = OrderDetails.OrderProductId
--JOIN Electronics
--ON OrderDetailsProducts.ElectronicId = Electronics.Id
--JOIN Products
--ON OrderDetailsProducts.ProductId = OrderDetails.OrderProductId or OrderDetailsProducts.ElectronicId = Electronics.Id
--GROUP BY Customers.Name, Surname, ELectronics.Price, Products.Price
--HAVING SUM(ELectronics.Price) > 1000 or SUM(Products.Price) > 1000 or SUM(ELectronics.Price) + SUM(Products.Price) > 1000


--5) Sozdat Predstavlenie (view) gde budut pokazani Customeri kotorie imeyut Bonus cardi
--CREATE VIEW Customer_With_Bonus AS
--SELECT Name, Surname, BonusCard.Id
--FROM Customers
--JOIN BonusCard
--ON Customers.BonusCardId = BonusCard.Id

--6) Pokazat Customerov kotorie ewe ne sdelali ni odnoy pokupki (cyi bonusi ravni nulu)
--SELECT Customers.Name, Customers.Surname, BonusCard.BonusQuant
--FROM Customers
--JOIN BonusCard
--ON BonusCArd.Id = Customers.BonusCardId
--WHERE BonusCard.BonusQuant = 0