# CS2102 21/22

## [1] DB definitions

data schema: describes db structure using a model
domain: set of atomic values possible, e.g. domain(course) = {2102, 2105, ...}

Integrity constraints:

1. Domain constraint: range of values fixed, see domain.
2. key constraint: key must remain unique, at most 1 instance of each key
3. foreign key constraint: all foreign keys in referencing table must be **NULL** or a primary key of the referenced table

Superkey: set of attributes that uniquely identifies row
Key: Superkey w/ minimum attributes, such that if any attribute is removed it is no longer a superkey
Candidate key: one of the possible primary keys

## [1] Transactions

abstraction for unit of work. Must be:

1. Atomic: Either all changes made or none (rollback)
2. Consistent: ensure data is valid (according to checks etc.). if invalid rollback.
3. Isolation: Computation done outside of db, any concurrent changes will not affect.
4. Durability: Effects persist even through system failures

## [2] Relational algebra operators

**Projection**
πℓ(R): gets a subset of columns of R.
e.g. R = (name | price) => (name)

- output will not contain duplicates(is a set)

**Selection**
σc(R): selects rows that satisfies condition c.

**renaming**
ρℓ: renames columns

**Union**
`∪`, `∩`, `-`

- Union compatibility: must have same number of column, same types(**ORDER MATTERS**). different column names ok
- `-` set difference operator. `R - S`, elements in R but not S

**Cross product**
`A × B`: All permutations of A and B. e.g. `A` = {1,2}, `B` = {"x", "y"}, `A x B` = {(1, "x"), (2, "x"), (1, "y"), (2, "y"))}

#### Join operator

- Inner join: Select `condition` in A x B, e.g. find all pairs who share the same pizza they like
- Natural join: R x S only when the common columns are the same
  - basically inner join with condition: "all common columns have same value"
  - e.g. R = (a: 1, b: 2, c: 3), S = (a: 1, b: 2, d: 4) => res = (a: 1, b: 2, c: 3, d: 4)
- left outer join: inner join (any condition) + remaining tuples of lhs, missing columns get null.
  - e.g. condition = a == a2, `R = (a: 1, a: 2), S=(a: 1, b: 2) => res = ((a: 1, b: 2), (a: 2, b: null))`
  - right outer join/ full outer join: as their names suggest
- Natural left outer join: natural join + remaining dangling tuples of lhs.
  - same for right/full natural

### [4] Entity Relationship Diagram

- entity = box, attribute = circle, underlined for keys. relationship = diamond
- entity --> relationship: each entity participate **at most 1** of relationship
- entity === relationship: each entity must participate **at least 1** of relationship
- N-ary relationship: each `professor` works in one `department` located at some `building`
- weak entity [[entity]] ==> <<relation>>: entity w/o its own key, e.g. chapters, key requires `Book`'s id. `on delete cascade` for weak entity fk to owner
  - partial key: key used w/ owner entity's key, e.g. chapter no.
- aggregation --[]: relationship to relationship < Monitors > --[]< Sells >
- ISA hierachy triangle ISA [parent] --- ISA --- children: each children has attributes of parents + more

---

#### Constraints

- total participation constraint, === : must participate in at least one (partial participation = any)
- key constraint, --> : can participate in at most one
- [ISA]

### [7] SQL + Host language

- "static SQL": query does not change during runtime
- "dynamic SQL": dynamic query, e.g. using C/python etc.
- statement level interface: `.pgc` file (where c + sql mixed), processed to `.c`, compiled to `.exe`, exe interacts w/ db on run
- call level interface: written in `c` file. **Uses APIs**: e.g. `work W; W.exec(query);`

### [9] Normal Form

- Normal Form: Minimum requirements to reduce data reduncancy + data integrity
- Redundancy: Table(**name**, phone, addr) -> Alice has 2 phone numbers but 1 address, addr repeated -> redundancy
- Anomalies: `UPDATE`: Alice change 1 row phone number, other rows forget update. `INSERT`: say PK uses phone num, Bob no phone cannot insert. `DELETE`: Bob delete phone number, if phone is PK cannot delete
- Normalization: split into 2 tables to avoid above.
- Functional dependency: A1 ... An -> B1 ... Bm = whenever 2 objects have same A1 .. n, they have the same B1 .. m
  - Armstrong Axiom, Relexiivity: A, B -> B
  - Armstrong Axiom, Augmentation: A -> B then A,X -> B,X
  - Armstrong Axiom, Transistivity: A->B, B->C, then A->C
  - Decomposition: A->B,C, then A->B, A->C
  - Union: A->B, A->C, then A->B,C
- Closure: Closure of A1..n, {A1..n}+, = given A1..n what is guaranteed: A->B, {A}+ = A,B
- Key finding algo: For all combinations of attributes, find closure. Superkey = all columns in closure. Pick minimal set for key.
- Prime attributes: attributes found in a key. Not found in keys = non prime.
