
import math
import random
import time
from datetime import datetime


"""
Python入门习题
"""

# 1.计算两数之和
# 2.比较两数
# 3.计算 1 到 100整数和
# 4.统计 1-4组成的三位数

# 5.打印九九乘法表

# 6.打印所有水仙花数
# 7.猴子吃桃
# 8.统计字符类型个数
# 9.对简单列表元素排序
# 10.学生成绩排序
# 11.列表偶数求和
# 12.找出年龄最大者
# 13.按序插入列表
# 14.输入数字排序
# 15.寻找最小连续 9 整除数
# 16.输入整数打印星号
# 17.判断数字奇偶性
# 18.判断是否为闰年
# 19.进制转换
# 20.平方运算
# 21.计算连续数字串和
# 22.计算整数的阶乘
# 23.计算圆的面积
# 24.打印区间内的所有素数
# 25.求前 N 个数的平方和
# 26.计算列表数字的和
# 27.求范围内所有的偶数
# 28.移除列表中的多个元素
# 29.列表元素去重
# 30.变量互换
# 31.计算字典值的总和
# 32.计算倒数序列和
# 33.计算给定日期是年中的第几天
# 34.斐波那契数列
# 35.分解质因数
# 36.打印菱形
# 37.交换列表首尾元素
# 38.交换列表指定位置元素
# 39.统计列表中元素出现次数
# 40.计算列表元素之积
# 41.翻转头尾并拼接字符串
# 42.交换字典键与值
# 43.整数输入验证
# 44.验证年龄
# 45.绘制螺旋形圆圈图案
# 46.绘制线条型螺旋图案
# 47.随机生成
# 48.随机生成验证码
# 49.从指定范围随机选择 3 个不重复的数字
# 50.时间处理
# 51.遍历打印 0-2999耗时计算
# 52.遍历打印 0-9999耗时计算







'''

# 1. 计算两数之和
def add(a, b):
    return a + b

# 2. 比较两数
def compare(a, b):
    if a > b:
        return f"{a} > {b}"
    elif a < b:
        return f"{a} < {b}"
    else:
        return f"{a} == {b}"

# 3. 计算 1 到 100 整数和
def sum_1_100():
    return sum(range(1, 101))

# 4. 统计 1-4 组成的三位数
def count_1_4_numbers():
    count = 0
    nums = []
    for i in range(1, 5):
        for j in range(1, 5):
            for k in range(1, 5):
                count += 1
                nums.append(i * 100 + j * 10 + k)
    return count, nums

# 5. 打印九九乘法表
def print_multiplication_table():
    for i in range(1, 10):
        for j in range(1, i + 1):
            print(f"{j}*{i}={i*j}", end='\t')
        print()

# 6. 打印所有水仙花数（100-999）
def narcissistic_numbers():
    res = []
    for n in range(100, 1000):
        s = str(n)
        if sum(int(d) ** 3 for d in s) == n:
            res.append(n)
    return res

# 7. 猴子吃桃（第10天剩1个，前一天是后一天的2倍）
def monkey_peach():
    n = 1
    for _ in range(9):
        n = (n + 1) * 2
    return n

# 8. 统计字符类型个数
def count_char_types(s):
    digit = letter = space = other = 0
    for ch in s:
        if ch.isdigit():
            digit += 1
        elif ch.isalpha():
            letter += 1
        elif ch.isspace():
            space += 1
        else:
            other += 1
    return {'digit': digit, 'letter': letter, 'space': space, 'other': other}

# 9. 对简单列表元素排序
def sort_list(lst):
    return sorted(lst)

# 10. 学生成绩排序
def sort_scores(scores):
    return sorted(scores, key=lambda x: x[1], reverse=True)

# 11. 列表偶数求和
def even_sum(lst):
    return sum(x for x in lst if x % 2 == 0)

# 12. 找出年龄最大者
def oldest(ages):
    return max(ages)

# 13. 按序插入列表
def insert_sorted(lst, num):
    lst.append(num)
    lst.sort()
    return lst

# 14. 输入数字排序
def sort_input_numbers(nums):
    return sorted(nums)

# 15. 寻找最小连续 9 整除数
def min_9_divisible():
    n = 1
    while True:
        if int('9' * n) % 9 == 0:
            return int('9' * n)
        n += 1

# 16. 输入整数打印星号
def print_stars(n):
    print('*' * n)

# 17. 判断数字奇偶性
def is_even(n):
    return n % 2 == 0

# 18. 判断是否为闰年
def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

# 19. 进制转换
def base_convert(num, base):
    if base == 2:
        return bin(num)
    elif base == 8:
        return oct(num)
    elif base == 16:
        return hex(num)
    else:
        return str(num)

# 20. 平方运算
def square(n):
    return n ** 2

# 21. 计算连续数字串和
def sum_of_str_numbers(s):
    return sum(int(ch) for ch in s if ch.isdigit())

# 22. 计算整数的阶乘
def factorial(n):
    return math.factorial(n)

# 23. 计算圆的面积
def circle_area(r):
    return math.pi * r * r

# 24. 打印区间内的所有素数
def primes_in_range(start, end):
    primes = []
    for num in range(max(2, start), end + 1):
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                break
        else:
            primes.append(num)
    return primes

# 25. 求前 N 个数的平方和
def sum_of_squares(n):
    return sum(i ** 2 for i in range(1, n + 1))

# 26. 计算列表数字的和
def list_sum(lst):
    return sum(lst)

# 27. 求范围内所有的偶数
def even_numbers(start, end):
    return [i for i in range(start, end + 1) if i % 2 == 0]

# 28. 移除列表中的多个元素
def remove_elements(lst, elements):
    return [x for x in lst if x not in elements]

# 29. 列表元素去重
def deduplicate(lst):
    return list(set(lst))

# 30. 变量互换
def swap(a, b):
    return b, a

# 31. 计算字典值的总和
def dict_value_sum(d):
    return sum(d.values())

# 32. 计算倒数序列和
def reciprocal_sum(n):
    return sum(1 / i for i in range(1, n + 1))

# 33. 计算给定日期是年中的第几天
def day_of_year(date_str):
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return dt.timetuple().tm_yday

# 34. 斐波那契数列
def fibonacci(n):
    seq = []
    a, b = 0, 1
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq

# 35. 分解质因数
def prime_factors(n):
    i = 2
    factors = []
    while i <= n:
        if n % i == 0:
            factors.append(i)
            n //= i
        else:
            i += 1
    return factors

# 36. 打印菱形
def print_rhombus(n):
    for i in range(n):
        print(' ' * (n - i - 1) + '*' * (2 * i + 1))
    for i in range(n - 2, -1, -1):
        print(' ' * (n - i - 1) + '*' * (2 * i + 1))

# 37. 交换列表首尾元素
def swap_ends(lst):
    if len(lst) < 2:
        return lst
    lst[0], lst[-1] = lst[-1], lst[0]
    return lst

# 38. 交换列表指定位置元素
def swap_positions(lst, i, j):
    lst[i], lst[j] = lst[j], lst[i]
    return lst

# 39. 统计列表中元素出现次数
def count_elements(lst):
    from collections import Counter
    return dict(Counter(lst))

# 40. 计算列表元素之积
def list_product(lst):
    result = 1
    for x in lst:
        result *= x
    return result

# 41. 翻转头尾并拼接字符串
def reverse_concat(s):
    if len(s) < 2:
        return s
    return s[-1] + s[1:-1] + s[0]

# 42. 交换字典键与值
def invert_dict(d):
    return {v: k for k, v in d.items()}

# 43. 整数输入验证
def input_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("请输入整数！")

# 44. 验证年龄
def validate_age(age):
    return 0 <= age <= 120

# 45. 绘制螺旋形圆圈图案
def draw_spiral_circle():
    import turtle
    t = turtle.Turtle()
    t.speed(0)
    for i in range(100):
        t.circle(5 * i, 45)
    turtle.done()

# 46. 绘制线条型螺旋图案
def draw_spiral_line():
    import turtle
    t = turtle.Turtle()
    t.speed(0)
    for i in range(100):
        t.forward(i * 5)
        t.right(45)
    turtle.done()

# 47. 随机生成
def random_number(start, end):
    return random.randint(start, end)

# 48. 随机生成验证码
def random_code(length=6):
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return ''.join(random.choices(chars, k=length))

# 49. 从指定范围随机选择 3 个不重复的数字
def random_sample(start, end, k=3):
    return random.sample(range(start, end + 1), k)

# 50. 时间处理
def current_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

# 51. 遍历打印 0-2999 耗时计算
def print_0_2999_time():
    start = time.time()
    for i in range(3000):
        print(i)
    end = time.time()
    print("耗时：", end - start, "秒")

# 52. 遍历打印 0-9999 耗时计算
def print_0_9999_time():
    start = time.time()
    for i in range(10000):
        print(i)
    end = time.time()
    print("耗时：", end - start, "秒")


'''


