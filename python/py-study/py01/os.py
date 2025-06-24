import os



print(os.name)
print(os.getcwd())
os.mkdir('testdir')
os.chdir('testdir')
print(os.listdir('.'))
os.chdir('..')
os.rmdir('testdir')

# 路径操作
print(os.path.abspath('.'))
print(os.path.join('folder', 'file.txt'))
print(os.path.splitext('a.txt'))

# 环境变量
print(os.environ.get('PATH'))
os.environ['MY_ENV'] = '123'