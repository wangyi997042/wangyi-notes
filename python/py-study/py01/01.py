"""
# 九九乘法表
a = 1
while a <= 9:
    print(a)
    b = 1
    while b <= a:
        print(f"{a} * {b} = {a*b}", end="\t")
        b += 1
    print()
    a += 1

"""

# import copy
# from module import boss_module
# copy.deepcopy
# name = "张三"
# def say_hello():
#     global name
#     name = '李四'
#     print(f"你好，{name}！")

# say_hello()
# name1 = copy.deepcopy(name)
# boss_module(name)
# print(name1)


# def run(func):
#     print("开始执行函数")
#     return func
# class Animal:
#     def __init__(self, name, sound):
#         self.sound = sound
#         self.name = name
#     @run
#     def speak(self):
#         print(self.name + self.sound + " 叫了一声")
#     def run(self):
#         print(self.name + " 跑了起来")
#         self.speak()

#     def __del__(self):
#         print(f"{self.name} 被删除了")

# dog = Animal("小狗", " 汪汪")
# dog.run()

# print(id(Animal), id(dog))


# class Animal:
#     def __init__(self, name):
#         self.name = name
#     def eat(self):
#       print("吃")

# class Dog(Animal):
#     def __init__(self, name, age):
#         super().__init__(name)  # 调用父类构造方法
#         self.age = age
#     def who(self):
#         super().eat()
#         print('我')


# dog = Dog("小狗", 3)

# class A(object):
#     def log(self):
#       print(dir(object))
# dog.who()

# a = A()
# a.log()


# class Singleton:
#   _abc = None
#   def test(self):
#     self._abc = 'abc'
#     print("test")
#   def test1(self):
#     print("test1", self._abc)
# a = Singleton()
# a.test()
# b = Singleton()
# b.test1()
# print(a._abc)
# print(b._abc)
#
#
# # 常见魔术方法和属性演示
# class Demo:
#     """这是一个演示类"""
#     def __call__(self, x):
#         print(f"调用对象，参数为{x}")
#
# demo = Demo()
# print(demo.__doc__)         # 输出类的文档字符串
# print(demo.__module__)      # 输出模块名
# print(demo.__class__)       # 输出对象所属的类
# print(demo.__class__.__name__)  # 输出类名
# demo(10)                    # 调用 __call__ 方法
# print(callable(demo))       # 判断对象是否可调用



# def count_up(n):
#     i = 0
#     while i < n:
#         yield i         # 暂停并返回当前值
#         i += 1
#
#
# gen = count_up(3)
# print(next(gen))        # 0
# print(next(gen))        # 1
# print(next(gen))        # 2
# # print(next(gen))      # StopIteration 异常




from multiprocessing import Process








