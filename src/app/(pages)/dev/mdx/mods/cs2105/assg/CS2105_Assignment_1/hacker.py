from socket import *
from hashlib import md5
import sys


serverName = "137.132.92.111"
serverPort = 4444

HANDSHAKE = b"STID_" + sys.argv[1].encode()
LOGOUT = b"LOUT_"
GET = b"GET__"
BYE = b"BYE__"
SOCKETNUM = 4


def generatePUT(hash):
    return b"PUT__" + hash


def generateLGIN(pw):
    return b"LGIN_" + pw


def receivePacket(clientSocket):
    res = clientSocket.recv(4)

    if res != b"100_":
        print("GET failed")
        return 0

    print("GET succeeded")

    length = clientSocket.recv(1)

    out = clientSocket.recv(1)
    while out != b"_":
        length += out
        out = clientSocket.recv(1)

    length = int(length)
    body = clientSocket.recv(length)

    clientSocket.send(generatePUT(md5(body).hexdigest().encode()))

    if clientSocket.recv(4) == b"203_":
        return 1
    else:
        return 0


def initSocket():
    clientSocket = socket(AF_INET, SOCK_STREAM)
    clientSocket.connect((serverName, serverPort))
    clientSocket.send(HANDSHAKE)
    res = clientSocket.recv(4)
    if res == b"200_":
        return clientSocket
    else:
        return None


if __name__ == "__main__":
    files = []
    sockets = []

    for i in range(SOCKETNUM):
        clientSocket = initSocket()

        if clientSocket != None:
            print("socket {} connected".format(i))
            sockets.append(clientSocket)
        else:
            print("connection failed")

    count = 0
    chunk = 10000 // SOCKETNUM + 1

    for i in range(chunk):

        for k in range(SOCKETNUM):
            pw = i + k * chunk
            clientSocket = sockets[k]
            clientSocket.send(generateLGIN("{:04}".format(pw).encode()))

        for k in range(SOCKETNUM):
            clientSocket = sockets[k]
            res = clientSocket.recv(4)
            if res == b"201_":
                clientSocket.send(GET)
                print("password found.")
                count += receivePacket(clientSocket)
                clientSocket.send(LOGOUT)
                clientSocket.recv(4)

    print("completed {}/8 files".format(count))
    clientSocket.send(LOGOUT)
    clientSocket.send(BYE)
    clientSocket.close()
