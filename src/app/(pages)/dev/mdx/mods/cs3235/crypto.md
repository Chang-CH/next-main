# CS3235 AY22/23 S1
## lecture 3
- Correctness: system satisfies specification --> reasonable input => reasonable output
- Security: system properties preserved in face of attacks --> unreasonable input => non disastrous output
- Policies: Confidentiality, Privacy, Integrity, Availability
- Threat model: who is attacker, what does he know etc.
- Security mechanisms: techniques to achieve security
- Goal: Policy cannot be violated within threat model
- Kerckhoffs's principle: cryptosystem should be secure even if everything but the key is public --> `Shannon's maxim`: the enemy knows the system

### Secrecy
- **Perfect secrecy**: regardless of prior information attacker knows, ciphertext should not leak additional info --> `Pr(M=m | C=c) == P(M=m)`. (Unlimited computational power)
- **Informal perfect secrecy** (semantic security): given 2 messages m1, m2, if one is randomly picked and encrypted to c1 attacker cannot guess if c1 was m1 or m2 with probability > 0.5
- Computational secrecy: relax semantic security, assumes adversary is "efficient" (limited compute power). Can perform any algorithm in PPT (polynomial time, w/ randomized/non-deterministic execution)
  - Security parameter: public info chosen by honest parties when generating/sharing key
  - Negligible function: if for all c (real number > 0) there exists k (positive integer) such that for all n >= k, `|f(n)| < 1/n^c`, i.e. as n --> infinity `f(n)*n^c = 0` (e.g. `2^-n`, `2^-sqrt(n)`, `n^-logn`)
  - Poly bounded: `|f(n)| <= n^c + d`.
  - Efficient algorithm == exists poly bounded function t and negligible function e fuch that probability the running time of algo A on input j, k (j == some +ve integer, k = random but string of p(j), p is some polynomial) exceeds t(j) is e(j)

### Classical ciphers
- caesar cipher: shift characters, e.g. a --> d, b --> e ... (ROT13 etc.)
- substitution cipher: one to one mapping of chars. preserves frequency of letters, might be possible to reconstruct
- vigenere cipher: divide plaintext into size k chunks, each chunk each character shift by amount specified in key  --> abc --123-> bdf
- correctness of ciphers => decrypting encrypted text get back plaintext
- one time pad: a pad of size >= plaintext, each byte xor with byte from pad. perfect secrecy. cannot guarantee integrity (if some plaintext is known, can xor ciphertext to modify it)
- 
### Attacks
- ciphertext only: break with c
- known plaintext: can access plaintext and ciphertext
- chosen plaintext: attacker can check output of encrypting chosen plaintext
  - Informal intuition: Attacker can send as many plaintexts as he wants, get ciphertexts. however, if he send 2 m and get 1 c, still cannot guess which m it is (**even if m was sent before**)
- chosen ciphertext: attacker can obtain decryption of chosen ciphertexts

### Stream cipher
- use secret k in pseudorandom generator to generate OTP
- unpredictability: given first bits of PRG(k), cannot determine next bits
- not perfectly secure (key space smaller than message space)

## Lecture 5
### Hashing
- integrity: given file and its hash, hard to find malicious file such that hashes match
- HMAC: construct Message Authentication Code from hash function. A, B share key k. A send m + MAC(k, m) to B. B recompute MAC, verify MAC matches
- MAC causes info leakage: if performed on plaintext, eve can see same mac so m must be same. therefore encrypt then MAC on result.

### Block cipher
- split blocks into N-bits, use same key for each block
- Electronic CodeBook: encrypt each block separately, same plaintext same result
- Cipher Block Chaining: XOR each block with encrypted previous block/IV, then encrypt(with same private key)
  - authenticity defeated by modifying IV.

## Lecture 6 Number theory

### Greatest Common Divisor GCD
- ax + by = gcd(x,y)
- gcd(x,y) = 1, x, y relatively prime. x has an inverse y (x * k = 1 mod y) iff gcd(x,y) = 1
- fermats little theorem: x^(p-1) = 1 (mod p) for all x in Z\*p; 
- Z\*N = set of all invertible elements of N (gcd(N, element) = 1). for prime numbers Z\*p == {1 ... p-1}
- Z\*p (p is prime) = cyclic group, where there exists g in the group where {1, g, g^2, ... g^(p-2)} == {set of all values in Z\*p} (modulo p)
- totient ϕ(N) = size of(Z\*N); for all x in Z\*N, `x^(ϕ(N)) = 1 (mod N)`; also, ϕ(p * q) == (p-1) * (q-1)

### Public Key crypto
- RSA:
  - terms: `p`, `q`: very large primes, `n` = `p*q`
  - procedure: choose `e` relatively prime to `ϕ(N)` (phi n relatively prime n e.g. (p-1)(q-1)). find inverse of `e`, `d`, s.t. `e*d = 1(mod ϕ(N))`.
  - Theorem: `x ^ ϕ(N) = 1 (mod N)` for all x in Z\*N
  - public key `(e,n)`, private key `d`. encrypt: `c = m ^ e % n`, decrypt: `m = c ^ d % n`.
  - works because: `m ^ ed == m ^ (1 + kϕ(N)) == m * (m^ϕ(N)) ^ k == m * 1 ^ k == m`.
  - no protection against chosen plaintext
  - no integrity, e.g. m --> m^k, c --> c^k
  - in practice, integrity: C = c xor G(r), h = r xor H(C), send C, h. G, H are hash functions, r is random number.
- Diffie Hellman
  - terms: `p` = public large prime, `g` = generator of Z\*p
  - procedure: alice send bob `g^a mod p`, bob send `g^b mod p`. key = `g^ab mod p`.
  - secure because: 
    1. given g ^ x mod p, hard to get x (discrete log)
    2. given g^x, g^y, hard to find g^xy(Computational Diffie Hellman)
    3. given g^x, g^y, hard to tell difference b/w g^xy and g ^r for some random r
- Public Key quite slow, usually used to establish symmetric key.
- SSL/TLS: guarantee end2end secure communication in presence of network attacker (control wifi, DNS, routers etc, send sniff modify)
  1. Client hello (protocol SSL version, random value, sessionid [for stay signed in], cipher suites available, compression methods avail)
  2. server hello (highest SSL supported by client + server, strongest crypto suite, fresh random number. public key cert (RSA/diffie hellman))
  3. Client key exchange: client generate secret key material (or the secret key itself), send to server encrypted with public key
  4. Switch to negotiated ciphers + derived secret key
  - version rollback attack: attacker modify client handshake, change SSL supported to lower value
  - SSL 2.0: cipher suite preference not verified. MAC hash weak, only 40 bits. no padding length verification, can delete bytes at end of msg
  - SSL 3.0: embed version number into each client message after step 4, server verifies
  - SSL requires 15x more resources server side. can use for DOS
- Certificate Authority: In order to trust site's public key, requires chain of trust, e.g. trusted CA sign site public key. root CA preinstalled.
  - X.509 certificate: version, cert serial, algorithm, issuer, validity period, subject's public key info, issuer/subject unique identifier
  - revocation mechanism: online revocation, receipient use online service check cert still valid; certificate revocation list, periodically issue eisgned list of revoked certs.

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
1. Stack smesh: buffer overflow stack, e.g. strcpy/gets, inject instructions/shellcode. stack no longer usable, injected code cannot contain `\x00` since strcpy will terminate
   - `strcpy` (`strncpy`), `strcat` (`strncat`), `gets` etc.
2. Integer overflows: exploit for loops, make them run more than supposed to, write to wrong locations
3. Format string attack: `printf` with too many `%d` pops extra stuff off stack, `aaa%n` writes `3` to stack
4. Heap overflow: e.g. structs, modify attributes outside e.g. `struct A{ int A[]; int attack; }`.
5. Read from memory: e.g. heartbleed, SSL heartbeat check server alive, `echo back 'A' length 5000`, prints 4999 chars from buffer
6. Dangling pointer: access `free()`'d memory. the memory could have been reallocated and thus modified by attacker.
7. Code reuse: ret2libc, smesh addr to libc function
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
  - root UID = 0. UID can change w/ syscall `setuid(newid)`, change EUID to RUID/SUID. must be root to change to any arbitrary ID
  - `setuid`, `setgid` bits, change EUID/EGID. sticky bit: off == user can r/w even if not owner so long as user has write permission, on == only owner can write.
  