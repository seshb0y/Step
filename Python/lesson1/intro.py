# 🧠 Разогрев (1–5) – базовый синтаксис, переменные, условия, циклы:
#
# Переменные и ввод/вывод
# Напишите программу, которая запрашивает имя и возраст пользователя, а затем выводит сообщение:
# "Привет, [имя]! Через год тебе будет [возраст + 1] лет."
# def func1():
#     name = input("Enter your name: ")
#     age = input("Enter your age: ")
#     print(f"Привет, {name}, через год тебе будет {int(age) + 1} лет.")
# func1()


# Чётное или нечётное?
# Запросите у пользователя число и выведите, чётное оно или нечётное.
# def func2():
#     num = int(input("Enter a number: "))
#     if num % 2 == 0:
#         print("чет")
#     else: print("нечет")
# func2()

# Факториал (через цикл)
# Напишите функцию, вычисляющую факториал числа, введённого пользователем.
# def func3(n):
#     result = 1
#     for i in range(1, n +1):
#         result = result * i
#     return result
# print (func3(5))

# Таблица умножения
# Выведите таблицу умножения от 1 до 10 в виде красиво оформленной таблицы.
# def func4():
#     for i in range(1, 10):
#         for j in range(1, 10):
#             print(f"{i * j : 3}", end="")
#         print()
# func4()
# Список квадратов
# Создайте список квадратов чисел от 1 до 20 с помощью цикла for и выведите его.
# def func5():
#     squares = []
#     for n in range(1, 21):
#         squares.append(n ** 2)
#     print(squares)
# func5()

# 🧰 Практика (6–10) – списки, словари, функции, строки:
#
# Функция: палиндром
# Напишите функцию, которая проверяет, является ли строка палиндромом (одинаково читается слева направо и наоборот).
# def func6(string):
#     if string == string[:: -1]:
#         return True
#     return False
# print(func6("helleh"))

# Словарь частоты слов
# Напишите программу, которая принимает строку и выводит словарь, где ключ — это слово, а значение — сколько раз оно встречается.
# def func7(string):
#     words = string.split()
#     freq = {}
#     for word in words:
#         word = word.lower()
#         freq[word] = freq.get(word, 0) + 1
#     print(freq)
# func7("кот кот собака кот собака")

# Сортировка списка по длине
# Дан список слов. Отсортируйте его по длине слов по возрастанию и убыванию.
# def func8(string, boolean):
#     if boolean:
#         print(sorted(string, key=len))
#         return
#     print (sorted(string, key=len, reverse=True))
#     return
# words = ["кот", "собака", "слон", "аист", "тигр", "лев"]
# func8(words, False)

# Генератор паролей
# Напишите функцию, которая генерирует случайный пароль длиной N символов (буквы, цифры, спецсимволы).
# import secrets, string
# def gen_password(n:int) -> str:
#     alphabet = string.ascii_letters + string.digits + string.punctuation
#     return ''.join(secrets.choice(alphabet) for i in range(n))
# print(gen_password(16))

# Объединение списков без дубликатов
# Есть два списка. Объедините их в один, удалив дубликаты.
# a = [1, 2, 3, 2, 5]
# b = [3, 4, 5, 6]
#
# merged = list(dict.fromkeys(a + b))
# print(merged)
#
# 🛠️ На повторение (11–15) – работа с файлами, модулями, обработка ошибок, списковые включения:
#
# Чтение из файла
# Прочитайте текст из файла input.txt, посчитайте количество строк, слов и символов.
# def stats(path="input.txt"):
#     with open(path, encoding="utf-8") as f:
#         text = f.read()
#     lines = text.splitlines()
#     words = text.split()
#     chars = len(text)
#     return len(lines), len(words), chars
#
# print(stats("input.txt"))

#
# Поиск максимального элемента
# Напишите функцию, которая возвращает максимум из списка чисел без использования встроенной max().
# def my_max(nums):
#     if not nums:
#         raise ValueError("Пустой список")
#     m = nums[0]
#     for x in nums[1:]:
#         if x > m:
#             m = x
#     return m
#
# print(my_max([3, 10, 7, 12, 5]))

#
# Обработка ошибок
# Напишите программу, которая делит два числа, введённых пользователем, с обработкой деления на ноль и ошибок ввода.
# try:
#     a = float(input("Введите делимое: "))
#     b = float(input("Введите делитель: "))
#     print("Результат:", a / b)
# except ValueError:
#     print("Ошибка: введите числа.")
# except ZeroDivisionError:
#     print("Ошибка: деление на ноль.")

#
# Списковые включения
# Создайте список всех чисел от 1 до 100, которые делятся на 3 и не делятся на 5, с использованием спискового включения.
# nums = [x for x in range(1, 101) if x % 3 == 0 and x % 5 != 0]
# print(nums)

#
# Календарь с использованием модуля calendar
# Напишите программу, которая выводит календарь на заданный месяц и год, введённые пользователем.
# import calendar
#
# year  = int(input("Год: "))
# month = int(input("Месяц (1-12): "))
#
# print(calendar.month(year, month))
