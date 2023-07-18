from re import findall
from sys import stdin, stdout


def parseHeader(header):
    match = findall(r"Size: (\d+)B", header)
    if len(match) == 1:
        return int(match[0])
    return -1


def parsePacket():
    head = stdin.buffer.read1(6)

    if len(head) == 0:
        return True

    buffer = 0
    inpt = ""
    while inpt != 'B':
        inpt = stdin.buffer.read1(1).decode()
        if inpt != 'B':
            if buffer == 0:
                buffer = int(inpt)
            else:
                buffer = buffer * 10 + int(inpt)

    # print(buffer)

    payload = stdin.buffer.read1(buffer)
    stdout.buffer.write(payload)
    stdout.buffer.flush()

    return False

    # print(payload.decode())


if __name__ == "__main__":
    # print(parseHeader("Size: 69B"))
    # data = stdin.buffer.read1()
    isEnded = False
    while not isEnded:
        isEnded = parsePacket()
    stdout.close()
