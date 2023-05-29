### 一、安装

执行如下命令

`brew search nginx`

`brew install nginx`

安装完以后，可以在终端输出的信息里看到一些配置路径：

`/usr/local/etc/nginx/nginx.conf （配置文件路径）`

`/usr/local/var/www （服务器默认路径）`

`/usr/local/Cellar/nginx/1.8.0 （安装路径）`

如果是 macOS 1.12 以上的系统，在安装过程中可能会出现”warning”，说是不支持该版本的操作系统，可以暂时先忽略它。

### 二、启动

在终端中输入

`ps -ef|grep nginx`

如果执行的结果是

```
501 15800 1 0 12:17上午 ?? 0:00.00 nginx: master process /usr/local/Cellar/nginx/1.8.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf

501 15801 15800 0 12:17上午 ?? 0:00.00 nginx: worker process

501 15848 15716 0 12:21上午 ttys000 0:00.00 grep nginx
```

表示已启动成功，如果不是上图结果，在终端中执行

`/usr/local/Cellar/nginx/1.8.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf`

命令即可启动 nginx。
这时候如果成功访问 localhost:8080，说明成功安装和启动好了。

### 三、停止

在终端中输入 ps -ef|grep nginx 获取到 nginx 的进程号，注意是找到“nginx:master”的那个进程号，如下面的进程好是 15800

```
501 15800 1 0 12:17上午 ?? 0:00.00 nginx: master process /usr/local/Cellar/nginx/1.8.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf

501 15801 15800 0 12:17上午 ?? 0:00.00 nginx: worker process

501 15848 15716 0 12:21上午 ttys000 0:00.00 grep nginx
```

在终端中输入以下几种命令都可以停止

```
kill -QUIT 15800 (从容的停止，即不会立刻停止)

Kill -TERM 15800 （立刻停止）

Kill -INT 15800 （和上面一样，也是立刻停止）
```

### 四、重启

如果配置文件错误，则将启动失败，所以在启动 nginx 之前，需要先验证在配置文件的正确性，如下表示配置文件正确

```
promote:bin yangqianhua$ /usr/local/Cellar/nginx/1.8.0/bin/nginx -t -c /usr/local/etc/nginx/nginx.conf

nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok

nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

### 重启有两种方法

1）在终端输入输入如下命令即可重启

```
promote:~ yangqianhua$ cd /usr/local/Cellar/nginx/1.8.0/bin/

promote:bin yangqianhua$ ./nginx -s reload

promote:bin yangqianhua$
```

2）根据进程号重启，执行命令 kill -HUP 进程号

```
启动：sudo nginx

停止：sudo nginx -s stop
```
