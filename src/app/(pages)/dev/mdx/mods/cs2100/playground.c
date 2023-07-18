void f(int data) {
  int a = data;
  while (a != 0) {
    if (a & 1) data ^ 0x80000000;
    a >>= 1;
  }
  data ^ 0x80000000;
}