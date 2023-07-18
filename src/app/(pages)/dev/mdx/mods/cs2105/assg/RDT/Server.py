from socket import *
import sys

# GLOBALS
RELIABLE = 0
ERROR = 1
REORDER = 2

# CONFIG
SERVER_PACKET = 1024
CLIENT_PACKET = 64

SEQ_SIZE = 4
LENGTH_SIZE = 2
CHECKSUM_SIZE = 2

TIMEOUT = 3
WINDOW = 10240

SEQ_LIMIT = 513 * 1024


class Packet:
    def __init__(self, seq, chksum, data):
        self.seq = seq
        self.chksum = chksum
        self.data = data
        self.lastSent = -1
        self.ack = False

    def encode(self):
        length = len(self.data).to_bytes(2, "big")
        seq = self.seq.to_bytes(4, "big")
        string = length + seq + self.chksum + self.data
        string += b" " * (SERVER_PACKET - len(string))
        return string


class Server:
    def __init__(self, student_key, mode, ip_address, port_num, filename):
        self.mode = mode
        self.serverSocket = socket(AF_INET, SOCK_STREAM)
        self.key = student_key
        self.ip = ip_address
        self.port = port_num
        self.fileReader = open(filename, "rb")

    def generateChecksum(self, data):
        res = 0
        for i in range(0, len(data), 2):
            temp = int.from_bytes(data[i: i + 2], "big")
            temp += res
            res = (temp & 0xffff) + (temp >> 16)
        res = ~res & 0xffff
        return res.to_bytes(2, "big")

    def connect(self):
        self.serverSocket.connect((self.ip, int(self.port)))
        self.serverSocket.send(b"STID_" + self.key.encode() + b"_S")

        # Wait queue
        while True:
            data = self.serverSocket.recv(2)

            while len(data) < 2:
                data += self.serverSocket.recv(2 - len(data))

            if data == b"0_":
                return True
            else:
                continue

    def close(self):
        self.serverSocket.close()
        self.fileReader.close()
        return None

    def generatePacket(self, seq):
        head_len = SEQ_SIZE + LENGTH_SIZE + CHECKSUM_SIZE
        data = self.fileReader.read(SERVER_PACKET - head_len)

        if data == b"":
            return None

        return Packet(seq, self.generateChecksum(data), data)

    def receivePacket(self):
        try:
            packet = self.serverSocket.recv(CLIENT_PACKET)
        except:
            # timeout
            return b""

        # nothing received.
        if packet == b"":
            return packet

        while len(packet) < CLIENT_PACKET:
            try:
                packet += self.serverSocket.recv(CLIENT_PACKET - len(packet))
            except:
                continue

        return packet

    def sendFile(self):
        # set timeout on recv
        self.serverSocket.settimeout(TIMEOUT * 1.0)

        buffer = []
        low = 0
        end = SEQ_LIMIT
        progress = 0

        # Initialise window data first
        for i in range(WINDOW):
            pkt = self.generatePacket(i)
            if pkt == None:
                end = i
                break
            else:
                buffer.append(pkt)

        # Connect to server
        self.connect()

        # Main loop
        while low < end:
            # Send all unack'd packets in window
            for i in range(WINDOW):
                if low + i >= end:
                    break

                packet = buffer[(low + i) % WINDOW]

                # GBN: resend all unacked
                if not packet.ack:
                    self.serverSocket.send(packet.encode())

            # Mark ACK's
            while True:
                # works as timeout mechanism to break loop
                packet = self.receivePacket()

                # no packet received, recv timeout. Assume no acks left, break.
                if packet == b"":
                    break

                seq = int.from_bytes(packet[:SEQ_SIZE], "big")
                chksum = packet[SEQ_SIZE: SEQ_SIZE + CHECKSUM_SIZE]

                # out of WINDOW, continue
                if seq < low or seq > low + WINDOW:
                    continue

                # checksum matches, slide WINDOW
                if buffer[seq % WINDOW].chksum == chksum:
                    if not buffer[seq % WINDOW].ack:
                        progress += 1

                    buffer[seq % WINDOW].ack = True

                    # slide WINDOW if possible
                    while low < end and buffer[low % WINDOW] != None and buffer[low % WINDOW].ack and buffer[low % WINDOW].seq == low:
                        buffer[low % WINDOW] = None

                        # Files yet to be generated
                        if low + WINDOW < end:
                            pkt = self.generatePacket(low + WINDOW)
                            if pkt == None:
                                # End of file read. Update actual max seq number
                                end = min(low + WINDOW, end)
                                low += 1
                            else:
                                buffer[low % WINDOW] = pkt

                        low += 1

            if low == end:
                break

        # send 10 ACK's
        for i in range(10):
            length = 11
            string = length.to_bytes(2, "big") + \
                b"FFFF" + b"FF" + b"ENDOFPACKET"
            string += b" " * (SERVER_PACKET - len(string))

            try:
                self.serverSocket.send(string)
            except:
                continue

            packet = self.receivePacket().strip()
            if packet == b"":
                continue

            if packet[SEQ_SIZE + CHECKSUM_SIZE:].strip() == b"ENDOFPACKET":
                break

        self.close()
        return None


if __name__ == "__main__":
    arguments = sys.argv
    server = Server(*arguments[1:])
    server.sendFile()
