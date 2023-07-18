# CS2030S

## Unit 2 Variables, Type

Variable Type: decides what operations can be used on the data, how it should be interpreted, what kind of abstraction it is.
Primitives: pass by value variables that do not share values with each other. e.g. byte, short, int, long, float, double, char, boolean
Subtype: let S be a subtype of T, S <: T. S is a subtype if all operations on T can be used on S variables with no issues.
Supertype: the opposite of Subtype
_use instanceof to check types_

## Unit 5 Information Hiding

Abstraction: Information hiding, provide only what users need, private everything else

## Unit 6 Tell don't Ask

Getters/Setters can be used to get to read/modify internal values, but they can easily break the abstraction barrier.
For example, if only the area is needed of a circle, expose getArea(), not getRadius().

## Unit 7/8 Class Fields/Methods

Public: all can access;
Protected: only members of the same Java package can access;
Private: only itself can access;
private methods cannot be overriden;
Static: A method/field belonging to a class;
No object needs to be instantiated to access it, must be accessible without main();
Cannot be overriden;
Final: immutable, cannot be edited;
Cannot be overriden;
Abstract: Implementation possibly undefined;
Any class/method that extends it must provide implementation;

## Unit 9 Composition

Composition: Storing/manipulating other composite classes (Has-a relationship);
Aliasing: Sharing references to th same object;
Might cause side effects when original object is mutated;

## Unit 10 Inheritance

Extends: Inherifts fields and methods of parent class (Is-a relationship);
All classes extend java.lang.Object;
Implements: A promise that a class will implement the methods in an interface;

## Unit 11/12 Polymorphism

Polymorphism: same method produce diff result based on Method overriding

<span style="background-color: #FFFF00">Important</span> Assuming B <: A, A var = new B(), compile type = A, runtime type = B.

### Early/Late binding

Static/final methods cannot be overridden, so at <span style="background-color: #00aa00"> Compile time </span> early binding occurs.
Overridden methods, <span style="background-color: #aa0000"> Run time </span> late binding occurs instead.
e.g. Parent has 2 methods, static method1 and public method2. Child extends Parent, with same method signatures.
Parent var = new Child();
var.method1 is Parent.method1 (early binding @ compile time)
var.method2 is Child.method2 (late binding @ runtime)

## Unit 13 Liskov Substitution Principle

LSP: If children override parent method, child method behaviour should be the same as parent
example: ColoredCircle extends Circle, Circle.getArea = area, ColoredCircle.getArea = color

## Unit 14 Abstract classes

Abstract classes: able to define abstract methods(no implementation, concrete children must override) and concrete methods

## Unit 15 Interfaces

Interface: like abstract but cannot define concrete methods(based on java version).
Concrete classes can implement multiple interfaces (Can-do relationship)

## Unit 16 Wrapper classes

Primitives cannot be treated as reference types, e.g. as Object or in generics
Wrapper classes: convert primitive datatypes into immutable reference types.
Hotboxing: Integer i = 5 -> 5 implicitly put in wrapper class

## Unit 17 Casting

<span style="background-color: #00aa00"> Compile time </span>

Compile time type is used to verify validity of object assignments.
Sometimes the runtime type makes the assignment valid, however compiler does not know it.
Casting tells the compiler to treat an object as a certain class when type checking.

## Unit 18 Variance

Let C denote a complex type, e.g. C< type > or type[].
Covariant: S <: T, then C(S) <: C(T) e.g. Array< type>
Invariant: S <: T, then C(S) no relation C(T) e.g. arrays, Float[] no relation Double[]
ContraVariant: S <: T, then C(S) :> C(T)

## Unit 19 Exception

Exceptions:

1. Checked: must be handled, e.g. IOException, or manually thrown exceptions. verified at compile time
2. Unchecked: Should be caught, might be runtime
   Errors:
   Serious, abnormal problems (extends throwable, not exception)
   Handline errors:
3. try: try block executes a block of code that potentially throws an exception
4. except: catches the specific exception defined in the parameter i.e. except(IOException e).
   multiple excepts can be chained, if 1 except fails to catch control passed to next except block
   Avoid pokemon error handling, aka except(Exception e)
5. Finally: Block that <span style="background-color: #FFFF00">ALWAYS</span> runs
   - runs after try completes without exceptions
   - runs after catch block completes
   - runs after exception caught in catch block
   - <span style="background-color: #FFFF00">Important</span> runs before return in try/catch
e.g. try {return 0;} finally{return 1;}, 1 is returned. 0 is ignored.

## Unit 20 Generics

Generics exist to prevent devs from having to code multiple classes/methods for every type they wish to accept.
Also to avoid being forced to accept Object/losing type checking.

- Other languages, e.g. C#, compiles generic classes into multiple classes for each permutation of type used.
- Java does not do this, instead does type erasure, covered later.
  Example: class Temp < T1, T2 >(T1 input, T2 input2); Temp< Integer, Boolean> var = new Temp<>();
  Bounded generics: Temp< T1 extends Integer >, T1 must be Integer or a subtype of integer.

## Unit 21 Type erasure

<span style="background-color: #00aa00"> Compile time </span>

Mentioned in U20, other languages use code specialization, whereas java uses type erasure for legacy compatibility.
Generics, Temp < T1 > becomes Temp, parameter T1 var becomes Object var.
If generics bounded i.e. Temp < T1 extends Integer >, then variable T1 becomes Integer after type erasure.
