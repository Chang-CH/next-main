# CS2102 SQL notes

## General
### Datatypes
`boolean`, `integer`, `float8`(8 byte double), `numeric` (arbitary precision float), `numeric(p,s)` (p digit integer s digit float), `char(n)` (fixed length string), `varchar(n)` variable length to n string, `text`, `date`, `timestamp`

### Boolean operators
Operators: `<>`: !=, `=`, `>`, `<`, `<=`, `>=`
precedence: `()`, `op(+, -, > etc.)`, `NOT`, `AND`, `OR`
- `AND` has higher precedence than `OR`: `A OR B AND C` == `A OR (B AND C)`

### Null values
`Null` means unknown: `Null = Null` == `unknown`. `Null + 20` == `Null`. Null does not break short circuits, e.g. `false and Null`
- use `value is null`/`is not null` + `IS DISTINCT FROM`/`IS NOT DISTINCT FROM` to handle
### Operations
`insert`: `insert into Table values (col1val, col2val, ...)` inserts a row
`delete`: `delete from Table [where]`deletes rows matching condition/all rows
`update`: `update Table set col = col + 10 [where]` updates rows
`select`: `select */col(s) from Table`
`alter table` + `alter column drop default`/`drop column`/`add column name type`/`add constraint con_name foreign key ...`

### Table operations
- combine tables: `union`, `intersect`, `except` (e.g. `(select ...) union Table2`) (Must be union compatible)
---

## Create table
### Row constraints
`not null`: `row integer not null`, ensure not null
`unique`: `row integer unqiue`/`unique(row1, row2)`: ensure row/tuple unique in table
`primary key`: `row integer primary key`/`primary key(row1, row2)`: mark primary key, must be present
`foreign key`: marks foreign key.
	1. `row integer references Table(col)`/ `foreign key(row1, row2) references Table(r1, r2`
	2. `FK ... Ref ... ON DELETE UPDATE`: specifies what to do if referenced table deleted/updated: `NO ACTION`, `RESTRICT` (cannot defere FK check), `CASCADE` (propagate change), `SET DEFAULT`, `SET NULL`
	3. `deferrable initially deferred/immediate`: indicates FK check can be delayed will transaction finished. behaviour set by `initially`

### Joins
1. Cross product: (`table1, table2`/`table1 cross join table2`)
2. Inner join: `table1 join table2`/`table1 inner join table2`
3. Outer join: `table1 left/right join table2`/`table1 left outer join table2`
4. Natural join: `table1 natural join table2`/`table1 natural left outer join table2` etc.

### SQL transactions
```sql
create table Employees(... constraint employee_fk ... deferrable ...);

begin;
set constraints employee_fk deferred;
update ... deferred;
delete ...;
commit;
```
- defer behaviour can be temporarily changed

---

## Select from
```sql
select columns
from table
where condition
group by columns
having groupFilterCondition
order by orderConditions
offset ignoreFirstN
limit maxMResults
```

### Order of evaluation
1. `from`: compute `table` if need be
2. `where`: filter `table` by `condition`
3. `group by`: partition tuples in groups
4. `having`: filter groups for `groupFilterCondition`
5. `select`: compute tuples in `columns`
6. `select`: if `distinct` present remove duplicates
7. `order by`: sort by `orderConditions`
8. `offset` + `limit`: offset then limit the rest

**NOTES**
- `table1 join table1 as table2` will cause duplicate columns

### from
- `distinct`: remove dupes, `as name` rename column
- `column as name`: rename `column` to `name` in result

### Group by
- `group by c1, c2`
- uses `x.c1 is not distinct from y.c1 and ...`
- outputs 1 row per group. if 1 column can have multiple values in agroup, query invalid, therefore:
- columns in `select` must be:
	1. an aggregate function `max(...)`
	2. a column in `group by`: `select c1 ... group by c1`
	3. a column in a table whose pk is in `group by`: Tables(__c1__, c2) -> `select c2 ... group by c1`
- **order matters**: T1(__shared__, c1), T2(__shared__, __id__, c2) -> `select c1 from` (`T1 natural join T2` vs `T2 natural join T1`) `group by shared`, case 1 works cas 2 invalid, since `shared` in case 2 is actually `T2.shared`, so pk `T1.shared` is absent

### order by
`group by ... order by avg(price)`/`order by ColumnName`
- default `asc`, but can add `order by col desc`

### offset + limit
- `offset n`: ignores first `n` rows
- `limit n`: returns first `n` rows after `offset`

### Boolean subqueries
- `exists`: `... where exists(Table)`, returns true if Table has more than 1 row
- `in`: `where columnVal in (select ...)`, returns true if `columnVal` is in the table. 
- `any`: `price > any(table)`performs ops on all, reduce with or. (`price > x1 or price > x2 ...`)
- `all`: `price > all(table)` like any but reduce with and
table must be 1 column for `in`, `any`, `all`, if not must use row constructor**: `row(col1, col2) in (select c1, c2 ...)`

row constructor can also be used as `row(c1, c2) < row(val1, val2)`

### Scalar subqueries
single column single row tables
- e.g. `select (select ...)`, `select (select ...) as c1`, `exists(select ...) as boolCol`

### Subqueries (`HAVING`, `FROM`, `WHERE`)
- e.g. `... from (select * from ...) as Table where ...`
- table alias is **compulsory**, column aliases `Table(col1)` is optional.

### Aggregate functions (`SELECT`, `HAVING`, `ORDER BY`)
returns a single value for tuples

functions: `min`, `max`, `avg`, `sum`, `count(A)`, `count(*)`
- e.g. `select min(Price) from ...`
- can add `distinct`: `sum(distinct Price)`
- can modify first, e.g. `max(price * qty)`
- if used in `select`, other columns must be aggregates, else see `group by` rules
- cannot be used in `where`. use table `where price = select min(price)`

### Common Table Expressions
```sql
with tempTable as (select rname from Sells), t2 as (select * from Users)
select * from tempTable where tempTable.rname = "sample"
```
- `with name as (table)`: creates temporary table with name `name`

### Views
```sql
create view ViewName(ColumnName) as select * from S1
```
- creates a view, like a permanently updated query. column aliases optional.

### Conditional Expressions
1. CASE: `select rname, case when condition then "pass" else "fail" end as result from Tests;`
2. Coalesce: returns first non null column in argument `select rname, coalesce(C1,C2,C3) as result`, if C1 = null C2 = 69 C3 = 420 returns 69. returns null if all null
3. Nullif: `select nullif(colName, "value") as status`, returns null if `colName = "value"` otherwise return **colName**.
4. Like: string regex. `where cname like '__%b'`, `_` = any char, `%` = 0 or more any char. example matches `Bob` and `Boob` but not `ob` (`_` not satisfied)

