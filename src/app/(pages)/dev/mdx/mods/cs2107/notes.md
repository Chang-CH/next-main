# CS2107 AY2122 S2

## Lecture 0: Terminology

1. Confidentiality: unauthorized disclosure **Cannot tell what was written** (ciphers)
2. Integrity: unauthorized modification (ransomwares encryption = violation) -> authenticity, **cannot modify what was written** (hash)
3. Availability: unauthorized blocking of access (DDOS etc.)
4. Common Vulnerabilities and Exposures: repository of vulnerabilities

## Lecture 1: Encryption

### Terminology

1. Ciphertext only: only ciphertext + some properties of plain text, e.g. english sentence
2. Known plaintext: ciphertext + plaintext
3. Chosen Plaintext attack: access to oracle/blackbox, can keep encrypting plain texts
4. chosen ciphertext attack: access to decryption oracle, oracle given ciphertext decrypts to plaintext

### Classical ciphers
1. substitution ciphers
   - swap a with f, b with x etc.
   - vulnerable to known plaintext, exhaustive search, ciphertext only (frequency analysis, english sentence certain letters more common)
2. permutation cipher
   - swap character positions in text
   - similarly vulnerable
3. one time pad
   - given one time pad of bit strings
   - xor with bitstring to get ciphertext
   - basically perfect, unless pad leaked/reused

### Modern ciphers

Kerckhoff's principle: assume everything except private key is known to public

Security through obscurity: security by hiding implementation details.

1. AES
   (DES key length 56 bits too short)

   Block length 128/192/256, block ciphers

   **Ensures confidentiality, not authenticity** -> modify IV basically messes up authenticity.

   **MODES**
   1. Electronic Code Block: encrypts each block with same key. leaks info (deterministic encryption, same block same output -> leaks information)
   2. Cipher Block Chaining: XOR each block with encrypted previous block/IV, then encrypt(with same private key)
      - authenticity defeated by modifying IV.
   3. Counter Mode: Ciphertext block Cn = plaintext block Xn xor Encrypt(IV + n), basically like a pseudo one time pad generator. no padding(leaks data).
      - **MALLEABLE**: since xor is last step, can attacker can modify s.t. decrypt different.
      - say known plaintext, `m = take $1000`, attacker want to change to `take $9000`.
      - find y s.t. `1 xor 9 = y`. xor the bit (c7) in ciphertext w/ y
   4. Galois/Counter Mode: Extra authentication tag. secure despite decryption oracle

   Triple DES meet in the middle: double DES, can encrypt plaintext m with all possible keys -> x, decrypt c with all possible keys -> y, find where x == y. Triple DES fixes this, no known efficient attacks

   **Padding oracle attack**
   AES CBC decryption: decrypt Cn into intermediate In, then xor with previous block/IV Vn, result is plaintext Mn
   1. Given padding oracle P that: given cipher text c, reveals if c padded correctly:
      1. PKCS#7: 3 bytes of padding, last 3 bytes = 0x03, if no padding full block of 0x00
   2. work on last byte first. Keep changing IV/previous block last byte Vn until oracle pass.
   3. This means that Vn(modified) xor In = 0x01 (assuming it wasnt already 0x01)
   4. This means that In = 0x01 xor Vn(modified)
   5. Therefore plaintext Mn = In xor Vn(original)
   6. repeat for next byte(s)
2. Stream ciphers
   - generate long pseudo random one time pad using generator w/ key + IV

## Tutorial extras

- Cryptology = Cryptography + Cryptanalysis.
- National Security Agency (NSA): US national-level intelligence agency of the US Dept of Defense, foreign intelligence signals intelligence (SIGINT).
- National Institute of Standards and Technology (NIST): a measurement standards laboratory, and a non-regulatory agency of the US Dept of Commerce.
- Cryptography backdoor: secret key developer can use to break all encryption.
- Key escrow: decryption key held in escrow so authorized third party can decrypt.
- Decryption order: a court order suspect to decrypt/reveal key
- JAVA Random
  1. 48 bits
  1. Uses the system clock to generate the seed
  1. 2^48 attempts are required to break the code
  1. Uses what’s called a Linear Congruential Generator to produce random values
- JAVA SecureRandom
  1. up to 128 bits
  1. takes Random Data from OS to use as the seed.
  1. 2^128 attempts will be required, which will take years to break
  1. Uses SHA1 to generate pseudo-random numbers, hash over a true random number(uses an entropy source)

## Lecture 2: Authentication

- Authenticity implies integrity
- password systems need: bootstrapping(establish common password -> default/ secure channel), authentication(authenticate password), password reset
- weak authentication: vulnerable to replay attack, send same packet etc.
- server should hash passwords in case of leaks, compare hashes instead. Salt, prepend/append random bits to password before hashing so 2 user same password not same hash. store salt in server.

### Password entropy

- Measure of password strength.

```py
#9 digit numeric password: total 10^9 possible passwords
possible_combinations = pow(10, 9)
entropy = math.log(possible_combinations, 2)
```

- RFC 4086: online attacks = **29** bits entropy
- NITS, offline attacks = **128** bits entropy (crypto keys)

### Fingerprinting

- False Match Rate, probability a wrong fingerprint identified as correct: `# successful false matches / # attempted false matches`
- False Non Match Rate, probability a correct fingerprint rejected: `# rejected genuine / # attempted genuine`
- Equal Error Rate: `FMR == FNMR`, usually `0.5 - 5%`
- False to Enroll Rate: Probability user's biometric cannot be captured, e.g. injury
- Failure to Capture Rate: Probability user cannot even be captured, e.g. water/dirt

### 2FA

- Time based: based on time + shared secret generate temp password
- Sequence based: based on number of times generated
- SMS etc.

### OCBC incident (PRESENTATION)

- phishing website, fake sms (spoof name + short code, appear in same ocbc sms thread)
- customer service calls increased 40%, 13.7 mil lost, 790 affected
- mitigation: links removed from sms

## Lecture 3: MAC + signature

public key encryption PKC: encrypt with public key, decrypt with private key. Allows secure broadcast channel, each entity broadcast/save public key.

### RSA (PKC)

1. choose 2 large primes `p`, `q`. `n` = `pq`.
2. totient, `Ф(n)` = `(p-1)(q-1)`.
3. choose exponent `e` such that `e` is coprime (gcd = 1) w/ `Ф(n)`
4. find decryption exponent `d` such that `d*e % (p-1)(q-1) = 1`
5. public key = `(n, e)`, private key = `(n,d)`.
6. encrypt `c = m ^ e % n`.
7. decrypt `m = c ^ d % n`.

Based on the formula `m ^ r % n == m ^ (r % Ф(n)) % n`. Note that d and e can be swapped and still works. Note: finding plaintext could be easier than factorization n -> p,q

key size approx 2048 bits

PKCS#1 adds padding (random IV so same plaintext wont give same ciphertext)

Homorphic property (arithmetic operations can be performed w/o decryption), can be vulnerable

RSA **CANNOT** be used in place of AES CBC (i.e. RSA CBC) -> RSA encryption done with public key, attacker basically has encryption oracle, can guess plaintext and check -> `c2 = (c1 xor m2) ^ e % n`.

128b AES approx equivalent 3072b RSA, RSA encryption/decryption **SIGNIFICANTLY SLOWER** then AES

### Discrete log PKC

- ElGamal Encryption, elliptic curve, 300b ECC approx = 2048b RSA
- Paillier Encryption

## Hashing

Hash must be collision resistant (hard to find another text w/ same hash) + one way.

- MD5: 128b digest, broken
- SHA256/SHA3: secure

### Keyed Hash (MAC)

After seeing multiple valid hash + plaintext, cannot forge mac of unseen message

- HMAC (RFC 2104) internally uses multiple SHA-1 hashes
- CBC-MAC: `Hi = encrypt(Mi xor H(i-1))` w/ private key & IV.

### Signature (public key MAC)

- user can use public key to verify signature
- almost impossible to forge signature without private key
- offers Non-repudiation: assurance that someone cannot deny previous actions

### Birthday attacks

- If there are X messages each randomly tagged with Y possible values
- And `x > 1.17 * Y ^ 0.5`, then there is more that 0.5 chance there exists 2 messages with same value
- e.g. hash digest 30 bits, possible hashes 2^30, 2^10 messages generated, given 2^10 = 1.17 * 2 ^ 30 ^ p, then probability p at least 2 have same digest
- Digest must be much larger than key (e.g. 2x)

### Hash chaining

Say large bank of messages known. Given reduce function `R()` that maps hash H to known word w(must be a possible plaintext, e.g. possible password). Aim to given digest y find some x st Hash(x) = y

chain: `w0 -> Hash(w0) = h0 -> R(h0) = w1 -> Hash(w1) = h1...`, store `w0, hlast` in a data struct `T`.

1. if exist entry `hlast == y`, work from `w0` until we get `wlast`.
2. if not exist compute `y'` = `Hash(R(y))`. find `y'`, if found means `y` is second to last in the chain (`y'` is the last). else repeat.

2^50 possible values, chain length (hash + reduce) 2^20, total size(chain no) 2^30

### Rainbow table

- Goal to find original text from hash
- Table storing hash to original values via precomputation

## Lecture 4 PKI + channel security

Certificate Authority: Trusted authority, signs certs with private key.
Certificates: (X.509) Contain at least name(email, domain name etc.), public key, validity window, CA signature. Can include disgest, metadata, encryption algo etc.). Certificate still vulnerable to DNS spoofing -> does not verify ip address, only securely gives user server's public key.
Chain of trust: root CA preloaded, signs other CA's

---

Revocation (update preferrably once per week):

1. (online) Certificate Revocation List: CA periodically sign + publish list
2. Online Certificate Status Protocol: validate cert online

CA flaws:

1. implementation bugs: `\0` in domain name, browser parse cert verify with `\0`, user see truncated without `\0`
2. rogue CA

Social Engineering:

1. typosquat: v instead of u, 0 instead of o etc.
2. sub domain: `valid.com.scam.io`.

### Authentication

1. Challenge response:
   1. shared secret `k`, **B** sends **A** request
   2. **A** challenges B with `m`, **B** reply with `t = mac(m, k)`.
   3. **A** accepts `t`. **A** authenticated **B**
2. PKC
   1. **A** issues challenge `r`. **B** uses private key, signs `r`, sends signed `r` + `B` certificate.
   2. **A** verifies certificate, then extracts public key from cert, verify signature of `r`.

**Post authentication**: mallory can still intercept after authentication. Therefore do key exchange during authentication, keep shared secret, session key `k`. (e.g. station to station protocol)

1. PKC key exchange:
   1. **A** generate public/private key, send public key to **B**.
   2. **B** chooses secret `k`, encrypts with public key from **A**. send to **A**.
   3. **A** decrypts using private key to get `k`.
2. Diffie Hellman key-exchange (if + authenticated key exchange == Station to Station protocol)
   1. **A**, **B** agree upon `g`, `p`. Both known to public. `p` = large prime.
   2. **A** chooses `a`, computes `x = g ^ a % p`, send `x` to **B**.
   3. **B** chooses `b`, computes `y = g ^ b % p`, send `y` to **A**.
   4. **A** gets private key `k` with `y ^ a % p`, vice versa for **B**.
   5. ASSUMPTION: given `g ^ a % p`, `g ^ b % p`, hard to find `g ^ ab % p`.
   6. CANNOT GUARD AGAINST INTERCEPTION: mallory can intercept, send own `g ^ m % p`.
   7. Station to station: **A** knows **B** public key. **B** signs `y` using private key. **A** verifies `y`, computes rest as per usual.

- Single Sign On: After first manual authentication, server send auth token to user, browser keeps token, auto resend each time user visits site. token has expiry date.

### Mutual Authentication

**A** knows **B** public key, vice versa. public keys known as **Master Key**/**Long term key**. Carry out Authenticated Key Exchange, e.g. STS. obtain session key `k`.

### TLS/SSL

- uses long term keys (server's public keys, via certificate). (unilateral, auth Server) Authenticated key exchange in TLS handshake, establish session keys `t`, `k`.
- `t` for mac, `k` for encryption.
- data in message = `Encrypt(#seq no + message, k) + mac(entire encrypted front part, t)`.
- Protects b/w layer 5 & 4 -> attacker @ layer 4 cannot see raw data, can see TCP header, TLS header.

1. TCP init (Client SYN Server, Server ACK Client, Client ACK Server, TCP established)
2. Alice send `ClientHello` to server
3. Server reply `ServerHello` w/ certificate to alice
4. Alice does key exchange session key w/ server public key in cert
5. Server establish session key

### TLS Renegotiation attack

- MITM in layer 3 (Network/IP)

1. Alice `ClientHello` Server
2. MITM intercept Alice `ClientHello`, stores.
3. MITM `ClientHello` Server
4. Server reply `ServerHello` w/ cert
5. MITM establish session key `k(m)`.
6. MITM sends some data, e.g.

```
GET /test?q=query;address=mitm HTTP/1.1
X-Ignore-This:
```

7. MITM forward alice `ClientHello`.
8. Server sees a renegotiation, Alice sees nothing wrong. new session key `k(a)` established.
9. Alice then sends valid data, e.g.

```
GET /test?lmao=69;address=alice HTTP/1.1
Cookie: alicecookie
```

10. Server treats requests as part of continuous packet, appends information:

```
GET /test?q=query;address=mitm HTTP/1.1
X-Ignore-This: GET /test?lmao=69;address=alice HTTP/1.1
Cookie: alicecookie
```

11. Alice is hack. header is ignored, `Cookie` on newline appended to MITM request, authorized.

## Lecture 5 + 9: Websec

|-|
|5. Application (HTTPS, hostname)|
|4. Transport (port, TCP/UDP)|
|3. Network (IP datagrams)|
|2. Link (MAC addr)|
|1. Physical|

- Man In The Middle:
  1. `MITM sits in Layer 3`: MITM can see/modify input/output of layer 3, including private key @ layer 3.
  2. `MITM sits just below Layer 3/ in b/w 2 & 3`: can modify output of Layer 3, but not internal data/input @ layer 3.

---

- UDP `DatagramSend(src port, dest ip, dest port, msg)`, msg at most 65KB. UDP no result returned.
- TCP `P = open_connect(2, “33.43.100.2”, 65533); send(P, out_message); read (P, in_message); close_connection(P);`

- DNS attack: normal DNS query DNS server, get ans w/ UDP. If attacker in same network, can sniff/inject spoofed data into channel.
  - Attacker sniff Alice request for DNS w/ `QueryID=0x6A`.
  - Attacker send spoofed response with QID `0x6A` before DNS server replies
  - Alice accept first response with spoofed IP.
- ARP Poisoning: Attacker connected to same "router" switch, poison switch table with spoofed MAC addr
  - Attacker can redirect packets to self, act as MITM in layer 2.
- Denial Of Service attack:
  - Reflection attack: attacker send request to intermediate nodes, nodes flood target with requests. (DNS reflection: query DNS resolver with spoofed src as target ip)
  - Amplification attack: attacker send 1 request to intermediate nodes, node send multiple responses to target, amps attack. (ICMP ping w/ spoofed src as target, all connected hosts echo reply to victim. nowadays ping broadcast disabled)
- Address Bar spoofing: `\0` attack, phishing link

### Tools

- Wireshark: MITM in layer 2.
- Nmap: port scan

### Mitigation

- TLS/SSL @ b/w layer 5 & 4 (prevents MITM @ 4 & below, but useless against attacker @ 5)
- WPA2: b/w layer 2 & 1, encrypt + mac IP header + datagram body. Attacker can still sniff dest mac addr of request
- IPSec: layer 3, integrity + authenticity (no confidentiality)
- Firewall (ingress + egress filtering (TCP/IP header). If scans packet payload also, == deep packet inspection)
  - Packet filters (TCP/IP header)
  - Stateful Inspection (Deep packet inspection)
  - Proxy (modify packets)
- Intrusion Detection Systems
  - Attack signature detection: well known attack on certain port/src ip etc.
  - Anomaly detection: e.g. sudden surge in packets @ port
  - Behaviour based IDS: based on human behaviour, e.g. download habits
- Security Operation Center: IT/security team
- Security Information and Event Management: Tools used by SOC

### L9: Cookies

TCP Handshake, send `Set-Cookie: id`, client automatircally sends `Cookie: id` each time user visits server.

- `same-origin`: cookie can only be sent to original server that set the cookie(match `protocol` [http vs https], `hostname`, `port number`), cannot send elsewhere.
- session cookie, deleted once browser closed, secure cookies: only work on https
- Token based auth: after user authenticate, user receive token `t`. Subsequent requests user send `Authorization: t`, accepted as authentic user.

### Attacks

- XSS: when server returns response html that renders with user input. 1. **reflection xss**: redirect to legit website with script in params, 2. **Stored xss**: store script in website, e.g. xss in profile name
  1. Attacker makes user click on link to website `legit.com`, with xss'd parameters, e.g. `?query=<script>...</script>`.
  2. `legit.com` returns html containing injected script
  3. browser executes script when rendering
  4. Website can be defaced/cookie stolen.
- XSRF: session riding, mitigated by forcing authentication info, e.g. token, in request param `?token=...`, since malicious party dont know.
  1. **Alice** log into `bank.com`, then visits `malicious.com`.
  2. `malicious.com` trick **Alice** into clicking on `bank.com/transfer?to=attacker&amt=6969`.
  3. Since **Alice** alr logged into `bank.com`, cookie sent with request, `bank.com` accepts.

**OTHERS**:

- Drive-by-Download: unintentional download, w/ (actually click on malicious link) or w/o authorization (on legitimate site, script e.g. on ads execute code w/o notification)
- Web bugs/beacon: track user activity, e.g. facebook like button, check email read. can be tiny image, first time users download. repeat user wont download = visited.
- Clickjacking (User Interface redress attack): e.g. put transparent button, redirect user to unintended page
- Click fraud/ click farm: click on ads to bankrupt ad revenue/ generate ad revenue

## Lecture 6: Access Control

- `principal`/`subject`: user, wants to access `Object` via `operation`. `Reference monitor` grants/denies request.
- discretionary access control: owner decides access rights
- mandatory access control: system wide policy decides

1. Access control matrix: columns = files, rows = users, each entry = {rwx} etc.
2. Access Control List: store access rights as a list, e.g. b.exe -> (root, {r,x}) -> (Alice, {w})
3. Capabilities: List of each user + access rights for each file, e.g. Alice -> (a.c, {rwx}) -> (b.exe, {r})
4. Intermediate control: group, (user | group | all -> rwx|r--|--x). groups can only be created by `root` in unix, in `etc/group`.
5. Intermediate control: role, higher privilege access all lower + more. higher privilege = **lower ring**. Unix 2 rings, superuser + user.
   1. Bell lapadula, confidentiality
      - no read up, subject can only read security below current clearance, prevent info leakage
      - no write down, subject can **append** (not delete/modify) objects of higher clearance, prevent higher level leak info to lower level.
   2. Biba, integrity:
       - no write up: prevent unauth modification to higher clearance
       - no read down: prevent reading forged daat from lower clearance

- unix, `s` allow user execute w/ permission of owner. Superuser, UID = 0. (e.g.: `-r-sr-xr-x a.exe root`, any user can open `a.exe`, program can access files `root` can access)
- Controlled escalation: appication w/ higher privileges executed by lower privileged user, access higher privileged data.
- unix, real UID = UID of invoker. effective UID = UID being executed as. If execute bit = `s`, == UID of owner. (**Add 4 to front if Set UID enabled**)
- `PPID` = parent PID, `PID` = process ID, `UID` = effective userID, `RUID` = Real UID

## Lecture 7 + 8: Call stack

- Call stack tracks: parameters(x86), control flow (return addr etc.), local variables, previous stack frame

### Call stack attacks

|-|
|prev frame 0xFF|
|params|
|return addr|
|locals|
|next frame 0x00|

- Overwrite existing execution code portion
- Replace a memory location storing a code address used by `jmp`/`jz` etc.
- Replace memory location storing offset: `beq` etc. if carried on stack == `stack smashing` (replace ra/param etc.)

## Unsafe programming

- `printf` w/ arbitary user text: `"%d%d%d"` get parsed, `printf()` starts popping 4B (`sizeof(int)`) off the stack even if no params supplied to `printf`.
  - Mitigate with `printf("%s", user_string)`
- `\0` handling: SSL, some browser verify cert together with `\0`, ok, address bar parse `\0`, display truncated address
- Buffer overflow: put 11 elements into array of 10. `strcpy` (mitigated w/ `strncpy`) Overwrites the extra 1 element
- Stack smashing: `arr[0]` is at higher addr than `arr[n]` (overflows downwards). overflow enough = overwrite `rsp/ra`, jump to arbitary location
  - Canary: random value placed just before return addr. if changed program terminates. disabled with `fno-stack-protector`.
  - Address Space Layout Randomisation: randomise offsets of certain codes -> attacker need info leak to find offset to use functions e.g. `call()`.
- Script injection (SQL): unsanitised `'$userinput'`, user enters `a' or 1=1--`, bypass password check
  - parameterised queries: `query = 'SELECT * FROM A WHERE name=?'; parameters.add("name", userinput);` -> SQL knows userinput is a string, does not parse input as sql code. searches for name `a' or 1=1--`.
- TOCTOU race condition: attacker change data in between system time of check & time of use:
  - e.g. system check file accessible -> attacker change to sensitive file (e.g. change file to symbolic link to sensitive file) -> system read sensitive file

## Presentation topics

1. Zoom vulnerabilities
1. Waiting room: Zoom servers would automatically send a live video stream of the meeting, as well as the meeting’s decryption key, to all users in a meeting’s waiting room, even though waiting room = unauthorized
2. Zoom chat vulnerable to zip bombs: symbolic links, file way bigger than zip when extracted
3. Windows zoom client fails to validate .msi update installer certificate, can have remote code execution w/ priv escalation
2. Singhealth COI, 1.5 million records from may 2015 - july 2018 accessed, Integrated Health Information Systems detect unusual activity in Singhealth's database. PM lee hsien loong personal data + outpatient records accessed.
   1. Employees did not have adequate levels of cybersecurity awareness, staff reported case, no one cared/ were sleeping on the job. Antivirus too old to update, must reinstall, server not maintained.
   2. Employees holding key roles in IT security did not act appropriately, only 1
   3. Sophisticated persistent thread actor involved, state linked
3. OCBC stuff
    1. Website spoofing w/ phishing link
    2. Spoofed sms, attacker set sender name (senderId) to OCBC, appear in same OCBC sms log. mitigation: banks no longer send links in sms
    3. SS7 attacks: malicious node, claim to have access to victim phone number, 2FA sent to malicious node to forward to user
    4. scamshield. only ios though
4. Colonial pipeline: Darkside attack, russian cybercrime ransomware as a service group. May 7, 2021, 4.4 mil USD random paid
   1. (IT) Billing infrastructure attacked, could not charge customers. 200GB data stolen.
   2. Panic buying, state of emergency w/ fuel shortages
   3. Not state sponsored. state sponsored attacks usually not financially motivated, mostly political motivations e.g. snooping/actual destruction. Usually targeted, e.g. spear phishing.
   4. Supply chain attack: attack less secure parts to damage whole chain, colonial pipeline attacked, gas retailers no gas to sell.
   5. Operational Technology: Monitor events/processes/devices, make industrial/enterprise operations. Information Technology: organize/analyze data, produce/process info.
5. Ransomware attack (WannaCry)
   1. kill switch: ransomware keeps checking some website, once website was bought wannacry deleted itself, knows that researchers looking into its code. Possibly used to detect sandboxes: sandboxes make all urls accessible, attackers know url is not bought.
   2. ransomware: encrypt files, pay crypto @ personal tor onion link/ clearweb link to get decryption tool
   3. Attacks Server Message Block protocol, malicious packets can execute arbitary code on windows. originally used by NSA called EternalBlue. Exploit stolen by shadow brokers, released publicly on Medium
   4. outdated softwares vulnerable
