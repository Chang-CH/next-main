# CS3235 AY22/23 S1

## Part 2: memory attacks
- stack, top = higher addr, bottom = lower addr
- arguments at top, grow towards lower addr; shared lib/libc @ middle; heap at bottom grow towards higher addr; data/ text(code) below heap

### Function call
1. [caller] push arguments, return addr onto stack
2. [caller] `jmp` function addr
3. [callee] `push ebp`, addr of local var
4. [callee] set frame pointer to `esp` (end of stack)
5. [callee] push local var to stack

### Attacks
1. Stack smesh: buffer overflow stack, e.g. strcpy/gets, inject instructions/shellcode. stack no longer usable, injected code cannot contain `\x00` since strcpy will terminate. Note that `strncpy` does not append a `\0`, string still not safe. use `strcpy_s`.
   - `strcpy` (`strncpy`), `strcat` (`strncat`), `gets` etc.
2. Integer overflows: exploit for loops, make them run more than supposed to, write to wrong locations
3. Format string attack: `printf` with too many `%d` pops extra stuff off stack, `aaa%n` writes `3` to stack
4. Heap overflow: e.g. structs, modify attributes outside e.g. `struct A{ int A[]; int attack; }`.
5. Read from memory: e.g. heartbleed, SSL heartbeat check server alive, `echo back 'A' length 5000`, prints 4999 chars from buffer
6. Dangling pointer: access `free()`'d memory. the memory could have been reallocated and thus modified by attacker.
7. Code reuse: ret2libc, smesh return addr to jmp to libc function/ interesting code.
8. Return oriented programming: find gadgets e.g. `pop rax; retn`, chain a few such that registers/stack set up properly
9. Blind ROP: crash server, prayge dont re randomize

### Defense
1. [Prevention]: Non executable memory `noexec` e.g. windows `DEP`: mark stack/heap as non executable, cannot exec shellcode (prevents JIT apps, need exec heap)
2. [Prevention]: Address Space Layout Randomization: randomizes locations of memory @ runtime, requires info leak + offset
3. [Prevention]: Stack canaries: randomized values b/w rbp & locals, if smesh, value modified, detect. --> still can heap smesh tho
4. [Detection]: control flow graph: build list of possible call/retn targets. When running check CFG ensure validity
5. [Detection]: Control flow integrity: insert label just before target addr, check if label is correct or throw error when jumping there

### Attack types
1. Rootkits: **preserve existing access**, delay detection by hiding attack resources, provide backdoor access (does not include gaining access to system initially)


### Principles
1. Principle of least privilege: system should have ninimum privilege required to operate
2. Component design vs Monolithic: Monolithic, system compromised = all compromised. micro architecture only 1 service breached


### OS basics
- Process isolation: each process (compartment/component) has UID, 2 process w/ same UID == same permissions, permissions use to access files/ network etc., defined by system
- Qmail example (component design): [qmail-smtpd(external mail)] , [qmail-inject(internal mail)] --> [qmail-queue, `setuid`] --> [qmail-send] --> [qmail-rspawn outgoing remote (--> qmail-remote)], [qmail-lspawn outgoing local (root permissions, < 500LoC) (--> qmail-local)]
- Android example (process isolation): each app has UID running in own VM, communicate w/ unix socket, only ping/zygote(spawn proc) run as root; permission announced @ install time

### Access control
- reference monitor intercept request before resources
- Access Control Matrix: Object x Subject matrix, check (subject, file) ok
- Access Control List: each file w/ list of allowed users
- Capabilities: ticket, random bit sequence (or OS managed ticket), can pass from 1 process to another, reference monitor check ticket, no need check user
- Role based: roles = sets of users, partial order of roles e.g. admin --> superuser --> user, each list only store premissions added on top of prev
- Unix access control: (same for group ID, change uid to gid e.g. `setgid`)
  - [owner-grp-other] e.g. rwx-rwx-rw-
  - Real UID: same as UID of parent, determines which user started process
  - Effective UID: from set user ID bit on file/ changed by syscall: determines process permissions
  - Saved UID: to restore previous EUID
  - note that root's UID = 0. UID can change w/ syscall `setuid(newid)`, change EUID to RUID/SUID. must be root to change to any arbitrary ID
  - `setuid`, `setgid` bits, change EUID/EGID. sticky bit: off == user can r/w even if not owner so long as user has write permission, on == only owner can write/delete.

peda commands:
- `b *(addr) or line no.`: breakpoint
- `context`: context, params, stack, line etc.
- `checksec`: check `NX`, `ASLR` etc.
- `vmmap`: check memory range permissions
- `stack 20`: print stack
- `ropgadget`/`asmsearch "pop rdi; ret" [libc]`: rop gadgets

Format string:
- `%s`: string
- `%p`: pointer address
- `%n`: write number of printed chars into address
- `<k>$`: access kth positional argument --> `%5$n` = write to 5th argument