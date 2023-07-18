# CS2105 notes

## Lecture 1

- Packet transmission delay: `packet length` / `bandwith`
- Loss: Buffer queue too full, packets dropped
- internet: network of networks. accessed by ISPs
- internet exchange point (ixp): link ISP net to each other
- content provider network: website directly link to IXP, not an ISP network

|delay|desc|
|-|-|
|nodal|sum of all other delays (process, queue, trans, prop)|
|process|check bit errors, determine output link etc.|
|queue|time waiting for queued packets to transmit first|
|transmission|`packet length` / `link bandwidth`: rate entering pipe|
|propagation|`distance`/`speed`: time for packet to travel physical dist.|

- protocol: define format, order, actions
- Throughput: bits/s b/w sender and receiver if "packets transmitted continuously", throughput = `total bits / (dtrans * numPackets + 0.5 RTT)` where `dtrans` = `packet length / bandwidth` and `RTT` = `propagation delay sender to receiver`

## Lecture 2

- server: always on permanent IP, client: intermittent dynamic IP, only communicate w/ server
- peer(p2p): no server, each peer requests and provide services
- sockets: connection b/w network layers.
- App layer protocol (e.g. HTTP, SMTP, FTP): defines type, syntax, rules of messages
- HTTP: stateless, persistent/non TCP connection. uses CRLF eol. 1.0: GET/POST/HEAD, 1.1: PUT/DELETE
- non persistent TCP, each request/object must handshake first (2x RTT each). persistent only 1st request need 2x RTT rest 1x RTT
- RTT: time for packet to travel from client to server and back. (last bit leave till ACK arrives)
- Cookies: user server state, server sends `set-cookie: data`. client replies `cookie: data` in future
- Web caches/ proxy servers: server in front of origin server, only request from origin if not in cache.
- Top level domain: .com, .edu etc.
- DNS: lookup table to resolve IP. `Client` → `Local DNS` → `Root DNS(highest)` → `TLD DNS` → `authoritative DNS`(DNS of server host) → `IP addr`
- Maximum Segment Size MSS: size of body, excluding header.

**DNS lookup uses UDP**

## Lecture 3 + 5

### TCP

**ACK is seq no. of next segment expected**

#### Provides

- congestion control: throttle sender when network overloaded
- Reliable
- Flow control: `rwnd` allows sender to control how much data receiver sends
- connection oriented: for each unique(src IP, src Port), server creates a new socket. client new socket for each port.
- No minimum throughput, no security

#### Quirks

- sender and receiver both usually buffers.
- Setup required: initial handshake before data transfers
- **Server must create new socket** for each client
- creates new socket for each connection. total `n+1` sockets for `n` connections

#### Structure

```
<---32 bits--->
|source port      |dest port        |
|sequence number(of 1st byte)       |
|acknowledgement number (of byte)   |
|head length|unused|U|A|P|R|S|F|rwnd|
|checksum         |urgent data ptr  |
|options____________________________|
|data                               |
```

- `sequence no`: packet no, e.g. 1000 bytes Maximum Segment Size, seq no = (0, 1000, 2000, 3000...)
- `ACK no`: first byte of next packet expected
- `checksum`: same as UDP
- `head len`: header length
- `U`: contains urgent. read urgent data ptr and send up first
- `A`: contains ack, parse ack no.
- `P`: like urgent but push entire segment
- `R`: RST, reset: unable to parse, incorrect format etc.
- `S`: SYN, sync flag for handshake
- `F`: FIN, finish flag for closing
- `rwnd`/ Receive Window: no. of bytes receiver willing to accept, i.e. remaining free buffer

#### Process

1. Handshaking:
 1. client `LISTEN` send server `SYN`, seq = `x`. state change `SYN_SENT`
 2. server receive, state `LISTEN` to `SYN RCVD`. ACK with `SYN`, seq = `y`, ack = `x + 1`
 3. client receive, state `ESTAB`. ACK with `y + 1`. server state `ESTAB` on receive
2. closing TCP:
 1. client send server w/ `FIN` flag and seq = `x`, state becomes `FIN_WAIT_1`, cannot send anymore
 2. server ACK w/ `x + 1`, server state `CLOSE_WAIT`, server can still send. client receive, state becomes `FIN_WAIT_2`
 3. server does cleanup, send `FIN` flag segment w/ seq = `y`, server state `LAST_ACK`, cannot send. client state `TIMED_WAIT`
 4. client ACK `y + 1`, then wait 2x max segment lifetime before state `CLOSED`. server state `CLOSED` on receive ACK

#### TCP ACK generation

1. in order: delay 500ms, send ack
2. in order, pending ACK ^ not yet sent: immediate send ACK
3. out of order: immediate send dupe ACK
4. in order, out of order previously received: immediate ACK

- uses either Go Back N or Selective Repeat. buffer not in specification but usually both sender and recv have.
- ACK cumulative, ACK no = next packet expected

#### Timeout calculation

1. `EstimatedRTT = (1 - x) * EstimatedRTT + x * SampleRTT`, `x` usually 1/8. `SampleRTT` = latest RTT
2. `DevRTT aka safety margin = (1-y) * DevRTT + y * |SampleRTT - EstimatedRTT|`, `y` usually 1/4. Deviation from mean
3. `Timeout = EstimatedRTT + 4 * DevRTT`

#### TCP fast retransmit

- If 4 un ACK'd segments received, resend even if not yet timeout

---

#### UDP, User Datagram Protocol

```
<---32 bits--->
|source port|dest port|
|length     |checksum |
|data                 |
```

- Unreliable, does not have any features not in TCP
- Length includes header
- no handshake/setup. UDP has no idea if server received properly
- **Connectionless demultiplexing**: 1 socket for all client. sender attaches destination `IP` + `port`. Server use same port/socket for all.
- Checksum: detects errors. Keep summing 16 bit chunks of data. if MSB carry, wraparound to back. Invert sum to get checksum
- Used for DNS lookup.

```
x = 10...0
y = 10...0
+_________
   100...0(sum w/ MSB carry over)
    00...1(sum w/ wraparound)
__________
~   11...0(checksum)
```

## Lecture 4

- Utilization: fraction of time sender busy
- **RDT**(Reliable Data Transfer): usually involves unreliable underlying channel
  - 1.0: perfectly reliable underlying channel, just use underlying channel
  - 2.0: underlying channel may flip some bits. **Checksum** detect bit errors. `ACK`/`NAK` to retransmit data when necessary. if ACK/NAK corrupted 2.0 might accept duplicate data.
  - 2.1: `ACK` might get corrupted. Introduce packet `Seq #`. if ACK/NAK corrupt resend. receiver discard duplicate seq no.
  - 2.2: Instead of `NAK` send `ACK` with latest valid `Seq #`
  - 3.0: Entire packet might be lost. Add timeout. Resend only if timeout. Receiver resend ACK if dupe arrives.
- **FSM**(Finite state machine): state diagram

### ACK generation

- Stop and wait: wait for ACK/timeout before next packet. poor utilization: (`packet length L` / `link bandwidth R`) / (RTT + `L`/`R`)
- Go back n [pipelining]: send `n` packets one after other. ACK with highest in order **cumulative** ACK, **do not buffer out of order packets**. On ACK `k`, send packet `k + 1` ... `k + n` e.g. n = 4, send pkt 1-4. pkt 2 loss. discard pkt 3-4 pkt2 timeout, send pkt 2-5
- Selective repeat [pipelining]: receiver acknowledges all correct packets, buffers out of orders. sender timeout for **EACH** packet. resend just the unACK'd packets. receive pkt 0 ACK 0.

pipelining, n packet window, approx n * utilization

## Lecture 6 IP

- Routing: determine route taken by packets from src to dest
- Data plane: local per router function determines how datagram is forwarded
- Control plane: network wide logic, determines what routers to use from src to dest

### IP Addressing

32bit addr, 8 bit sections each 0-255: 223.1.1.1

- interface: connection b/w host and physical link: e.g. client -> wifi interface -> network. ethernet and wifi are diff interfaces.
- subnet: group of connected hosts, i.e. same interface*. can directly reach each other

---

CIDR: **C**lassless **I**nter**D**omain **R**outing

- `a.b.c.d/n`, first n bits = network prefix, remaining bits = host ID
- subnet mask: 1...1 0...0, `n` * 1 bits, rest 0 bits
- Special IP's: `0.0.0.0/8` (non routable special use), `127.0.0.0/8` (loopback, send to self), `10.0.0.0/8` etc. (private address, no need internet registry), `255.255.255.255/32` (broadcast address, all hosts on same subnet will receive)
- hierachical addressing: ISP advertise range of IP it has. if organisation move from ISP1 to ISP2, ISP2 need to advertise its own range + org's IP w/ longer prefix
  - router delivers to longest matched prefix, e.g. dest `69.0.0.0`, matches `69.0.0.0/23` over `69.0.0.0/10`

---

DHCP: Dynamic Host Configuration Protocol

- helps client(host) get IP
- clients = port `68`, server = port `67`
- done w/ UDP

steps (broadcast IP = `255.255.255.255`, special IP = `0.0.0.0`):

1. `client` broadcast `DHCP discover`: {`src`: special IP port 68, `dest`: broadcast IP port 67, `yiaddr`: special IP, `ID`: `x`}
2. `server` broadcast `DHCP offer`: {`src`: `server IP` port 67, `dest`: broadcast IP, `yiaddr`: `client assigned IP`, `ID`: `x`}
3. `client`: respond with `DHCP request`: {`src`: special 68, `dest`: broadcast 67, `yiaddr`: `assigned IP`, `ID`: `x + 1`}
4. `server`: ack with `DHCP ACK`: {`src`: `server IP` port 67, `dest`: broadcast 68, `yiaddr`: `assigned IP`, `ID`: `x + 1`}

IPV4 datagram:

1. version: IP protocol version number
2. TTL: number of hops left till destination
3. upper protocol: protocol @ transport layer, e.g. UDP/TCP
4. src IP addr (32 bits)
5. dest IP addr (32 bits)

IP datagrams are fragmented since different routers have different **Max Transfer Unit**. reassembled using other fields (fragment offset) in IPV4 datagram

### Network address translation

converts private local ips (e.g. home network w/ router) to public ips.

- Outgoing: NAT changes local ip/port with NAT ip/port
- Incoming: NAT replaces NAT ip/port with local ip/port

IPv6 128 bits, every machine can have public IP.

### Routing

- Routing Information Protocol: Distance Vector, Bellman ford:
  - distance from x to y = min(c(x, n) + d(n, y))
  - router only knows c(x,n) where n is some neighbour, ask neighbours for d(n,y) recursively

- Internet Control Messaging Protocol (ICMP)
  - used for error checking: e.g. ICMP echo request reply, ICMP ping
  - ICMP can report destination unreachable, time exceeded, etc.

## MAC

- LINK layer
- permanent 48 bit id hardcoded in ROM
- host adapter check datagram if MAC matches, drop if wrong

### Address Resolution Protocol

- resolves MAC from IP. each IP node (host/router) has ARP table &lt;IP, MAC, TTL &gt;
  - send same subnet: A broadcast B w/ MAC FF:FF:FF:FF..., B reply to A with MAC, A cache B MAC
  - different subnet: A send datagram w/ Router MAC + B IP. Router replace dest MAC with B MAC, src MAC with Router MAC.

### LAN switch topology

1. BUS: many machines tap into 1 long wire. Requires collision avoidance, when other nodes signal interfere with yours
   1. CSMA/CD: Network Interface Card waits till channel idle, send frames. If no other transmission detected, done. Else, abort + send JAM signal, wait random duration before retrying.
2. STAR topology: all nodes connected to central switch. no collisions.

NOTE: switch creates networks (internal LAN), routers connect networks (local LAN to other LANs)



