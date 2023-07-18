# Side channel attacks
### Timing attacks
- String comparison/early termination algos: can determine how many character correct by timing
- HMAC problem: HMAC(key, msg) == tag, can timing attack slowly figure out correct tag byte by byte
- HMAC Mitigation: enforce same comparison time by iterating through all bytes; might get optimized by compiler
- HMAC Mitigation:  compare hashes HMAC(key, HMAC(key, msg) aka mac) vs HMAC(key, tag) instead of HMAC(key, msg) == tag
- RSA problem: c = m ^ p mod e, m = c ^ d mod e. exponentiation w/ square n multiply, depends on bit k, if k == 1 compute long time.
  - Suppose we know exact timing compute first k-1 bits
  - guess kth bit, check for correlation b/w predicted kth bit timing and total timing. (check if timing graph matches actual)
  - more bits correct, signal stronger
- RSA solution: RSA blinding, instead of decrypting c decrypt (c * r), r = random. original plaintext = result / r % n

### Data anonimization
- Personally identifying information: Name, soscial security, phone num etc.
- Even without PII, can use quasi identifier: (age, race, religion) etc.
- k anonimity: given a quasi identifier, at least k records matching each identifer
- k anonimity generalization: mask off data to more general values: zip code 696969 --> 696***

Ideally, attacker cannot:
1. determine if given person is in dataset --> k anonimity, 10 records matching quasi identifier, 10 ppl in population, guy must be inside
2. cannot tell given person has sensitive attribute --> everyone is HIV+, if person in record, HIV+
3. cannot tell which record corresponds to a given person

### diversity
- l diversity: within each quasi identifer group, entropy of each sensitive attribute is at least l (at least l diff values) 
- l diversity still does not work: if 10% of popn HIV+, quasi identifier 10% HIV+, not diverse (in terms of %) but ok.
- t closeness: within each quasi identifier, sensitive attributes should be close to original distribution in entire db
- problem is no idea what attacker knows: e.g. attacker knows quasi identifer and some sensitive attribute
  
### Classical intuition of privacy
- anything disclosed from a statistical db can be learned without acces to the db
- absolute privacy guarantee impossible, adversary needs to be able to learn unpredictable things yet cannot disclose much data about user

### Randomized response
- actual data xi, returned data yi = xi with probability 0.5 + gamma, else ~xi with probability 1 - (0.5 + gamma)
- guessing original % of xi: `E((yi + gamma - 0.5) / 2 * gamma)`. Given `E(yi)`, original approx == `E(yi) / 2 * gamma + (gamma - 0.5) / 2 * gamma`