# Example1
# class Car:
#     def display(self):
#         print(f"I am a {self.name}")
#
# c1 = Car()
# c1.name = "iron man"
# c1.display()

# Example2
# class Car:
#     def __init__(self, model, make, year):
#         self.model = model
#         self.make = make
#         self.year = year
#         self.price = 0
#
#
#     def __str__(self):
#         return f'Model: {self.model}, Year: {self.year}, Price: {self.price}'
#
#     def display(self):
#         print("Model:", self.model)
#         print("Make:", self.make)
#         print("Year:", self.year)
#
#     def display(self, test):
#         print(test)
#
# c1 = Car("Honda", "Mustang", 1999)
# print(c1.display(2))

# Example3
import datetime

class Car:
    def __init__(self, make, model, year=datetime.datetime.year, color="Black"):
        self._make = make
        self._model = model
        self._year = year
        self.color = color
    def __str__(self):
        return f"{self._year} {self._make} {self._model} - {self.color}"