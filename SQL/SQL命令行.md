sql 中增删改查语句：
1、“INSERT INTO”语句，用于向表格中增加新的行；
2、“DELETE”语句，用于删除表中的行；
3、“Update”语句，用于修改表中的数据；
4、“SELECT”语句，用于从表中选取数据。

一、SQL 语句之增

INSERT INTO 表名 VALUES (值 1,….)
向 student 表中插入一个学生的数据

`insert into student (num,name,sex,age) values(140010，张三,男,23)`
二、SQL 语句之删

DELETE FROM 表名称 WHERE 列名称 = 值

删除 student 表中 num=140011 的这条数据。

`delete from student where num=140011;`
三、SQL 语句之改

UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
我们可以将 num 为 140010 的 age 值更改为 21。

`update student set age =21 where ID=140010;`
四、SQL 语句之查

SELECT 列名称 FROM 表名称

//以及：
`SELECT * FROM 表名称`
查询语句非常的重要的，所以需要详细来说一下。

1、查询 student 表中所有数据

`select * from student;`
2、查询 student 表中所有的 name 和 sex

`select name,sex from student;`

3、查询 num 为 140010 这一行的数据

`select * from where id =140010;`
