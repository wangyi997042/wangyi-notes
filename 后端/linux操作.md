
查看系统日志：
系统日志记录了系统的各种事件和状态信息，通常存储在 /var/log/syslog（Debian、Ubuntu 等系统）或 /var/log/messages（RHEL、CentOS 等系统）中。
# 使用 cat 命令直接查看日志文件内容（适用于日志文件较小的情况）
cat /var/log/syslog
cat /var/log/messages

# 使用 less 命令分页查看日志内容，按键盘上的上下箭头移动，按 q 键退出
less /var/log/syslog
less /var/log/messages

# 使用 grep 命令过滤特定关键字的日志信息，例如查找包含 "error" 的日志行
grep "error" /var/log/syslog
grep "error" /var/log/messages


查看服务日志：不同的服务通常有自己独立的日志文件，存储在 /var/log 目录下的相应子目录中。
# 查看 Apache 服务器的访问日志
less /var/log/apache2/access.log

# 查看 Apache 服务器的错误日志
less /var/log/apache2/error.log

# 查看 Nginx 服务器的访问日志
less /var/log/nginx/access.log

# 查看 Nginx 服务器的错误日志
less /var/log/nginx/error.log

# 查看 MySQL 数据库的错误日志（不同版本路径可能不同）
less /var/log/mysql/error.log



查看用户登录日志：
用户登录日志记录了用户的登录和注销信息，主要包括 /var/log/wtmp（记录所有登录会话）、/var/log/btmp（记录失败的登录尝试）和 /var/log/lastlog（记录每个用户的最后一次登录信息）。
# 使用 who 命令查看当前登录的用户信息
who

# 使用 last 命令查看系统的登录历史记录
last

# 使用 lastb 命令查看失败的登录尝试记录
lastb

# 使用 lastlog 命令查看每个用户的最后一次登录信息
lastlog

查看日志文件的实时更新：
使用 tail 命令可以查看日志文件的末尾几行，并实时跟踪文件的更新。
# 查看日志文件的末尾 10 行
tail -n 10 /var/log/syslog

# 实时跟踪日志文件的更新，按 Ctrl + C 停止
tail -f /var/log/syslog