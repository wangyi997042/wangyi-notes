
// ! 1. 数据插入（增）
// * 向表格中增加新的行。
// ? 标准语法：INSERT INTO 表名 (列1, 列2, ...) VALUES (值1, 值2, ...);
//   表名：目标表名称
//   列1, 列2：要插入的字段名
//   值1, 值2：对应的字段值
// 示例：
// INSERT INTO student (num, name, sex, age) VALUES (140010, '张三', '男', 23);
// TODO: 字段顺序需与值顺序一致，可一次插入多条数据（用逗号分隔多组 VALUES）。

// ! 2. 数据删除（删）
// * 删除表中的行。
// ? 标准语法：DELETE FROM 表名 WHERE 列名称 = 值;
//   表名：目标表名称
//   WHERE：筛选要删除的行的条件
// 示例：
// DELETE FROM student WHERE num = 140011;
// TODO: 省略 WHERE 会删除全表数据，操作前请谨慎。

// ! 3. 数据更新（改）
// * 修改表中的数据。
// ? 标准语法：UPDATE 表名 SET 列名称 = 新值 WHERE 列名称 = 某值;
//   表名：目标表名称
//   SET：要更新的字段及新值
//   WHERE：筛选要更新的行的条件
// 示例：
// UPDATE student SET age = 21 WHERE num = 140010;
// TODO: 省略 WHERE 会更新全表数据，操作前请谨慎。

// ! 4. 数据查询（查）
// * 从表中选取数据。
// ? 标准语法：SELECT 列名称 FROM 表名 [WHERE 条件];
//   列名称：要查询的字段名，可以用 * 表示全部字段
//   表名：要查询的数据表名称
//   WHERE：可选，筛选数据的条件
// 示例：
// SELECT * FROM student;                // 查询所有数据
// SELECT name, sex FROM student;        // 查询指定列
// SELECT * FROM student WHERE num = 140010; // 按条件查询
// TODO: WHERE 可省略，省略时查询所有数据，可结合 ORDER BY、LIMIT 等子句扩展查询功能。