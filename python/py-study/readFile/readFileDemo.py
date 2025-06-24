f = open('wangyi.txt', 'w+')

print(f.name)
# print(f.read(3))
# print(f.readline())
# print(f.readline())
# print(f.readline())
print(f.mode)
print(f.closed)

f.seek(2)

f.write("hello world")

# for line in f:
#     print(line.strip())
f.seek(0)
print(f.read())

f.close()
print(f.closed)
