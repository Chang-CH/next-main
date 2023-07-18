from socket import *
import sys

RELIABLE = 0
ERROR = 1
REORDER = 2

SERVER_PACKET = 1024
CLIENT_PACKET = 64
SEQ_SIZE = 4
LENGTH_SIZE = 2
CHECKSUM_SIZE = 2

TIMEOUT = 30
WINDOW = 10240


class Packet:
    def __init__(self, seq, chksum, data):
        self.seq = seq
        self.chksum = chksum
        self.data = data


class Client:
    def __init__(self, student_key, mode, ip_address, port_num, filename):
        self.key = student_key
        self.clientSocket = socket(AF_INET, SOCK_STREAM)
        self.mode = mode
        self.ip = ip_address
        self.port = int(port_num)
        self.fileWriter = open(filename, 'wb')

    def generateChecksum(self, data):
        res = 0
        for i in range(0, len(data), 2):
            temp = int.from_bytes(data[i: i + 2], "big")
            temp += res
            res = (temp & 0xffff) + (temp >> 16)
        res = ~res & 0xffff
        return res.to_bytes(2, "big")

    def connect(self):
        self.clientSocket.connect((self.ip, self.port))
        self.clientSocket.send(b"STID_" + self.key.encode() + b"_C")

        # Wait queue
        while True:
            data = self.clientSocket.recv(2)

            while len(data) < 2:
                data += self.clientSocket.recv(2 - len(data))

            if data == b"0_":
                return True
            else:
                continue

    def close(self):
        self.clientSocket.close()
        self.fileWriter.close()
        return None

    def receivePacket(self):
        try:
            packet = self.clientSocket.recv(SERVER_PACKET)
        except:
            return b""

        while len(packet) < SERVER_PACKET:
            packet += self.clientSocket.recv(SERVER_PACKET - len(packet))
        return packet

    def sendAck(self, seq, chksum):
        try:
            seq = seq.to_bytes(SEQ_SIZE, "big")
            string = seq + chksum
            string += b" " * (CLIENT_PACKET - len(string))
            self.clientSocket.send(string)
        except:
            return False
        return True

    def listenFile(self):
        self.clientSocket.settimeout(TIMEOUT * 1.0)
        window = 10240
        buffer = [None] * window
        low = 0

        progress = 0
        while True:
            packet = self.receivePacket()

            # In case EOF dropped or server crash
            if packet == b"":
                self.close()
                break

            length = int.from_bytes(packet[:LENGTH_SIZE], "big")
            seqNum = int.from_bytes(
                packet[LENGTH_SIZE: LENGTH_SIZE + SEQ_SIZE], "big")
            chksum = packet[LENGTH_SIZE +
                            SEQ_SIZE: LENGTH_SIZE + SEQ_SIZE + CHECKSUM_SIZE]
            data = packet[LENGTH_SIZE + SEQ_SIZE +
                          CHECKSUM_SIZE:LENGTH_SIZE + SEQ_SIZE + CHECKSUM_SIZE + length]

            if data.strip() == b"ENDOFPACKET":
                seq = b"FFFF"
                string = seq + b"FF" + b"ENDOFPACKET"
                string += b" " * (SERVER_PACKET - len(string))
                self.clientSocket.send(string)
                self.close()
                break

            # Corrupt packet/ out of window
            if chksum != self.generateChecksum(data) or seqNum > low + window:
                continue

            # duplicate packet, ACK
            if seqNum < low or (buffer[seqNum % window] != None and buffer[seqNum % window].seq == seqNum):
                self.sendAck(seqNum, chksum)
                continue

            # parse to packet
            buffer[seqNum % window] = Packet(seqNum, chksum, data)
            progress += 1
            self.sendAck(seqNum, chksum)

            # write to file, slide window
            while buffer[low % window] != None and buffer[low % window].seq == low:
                self.fileWriter.write(buffer[low % window].data)
                buffer[low % window] = None
                low += 1

        return True


if __name__ == "__main__":
    # <student_key> <mode> <ip_address> <port_num> <output_file_name >
    arguments = sys.argv
    client = Client(*arguments[1:])
    client.connect()
    client.listenFile()
