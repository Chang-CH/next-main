from zlib import crc32
from sys import argv

if __name__ == "__main__":
    if len(argv) < 2:
        print("Missing arguments")

    bytes = None
    with open(argv[1], "rb") as f:
        bytes = f.read()

    checksum = crc32(bytes)
    print(checksum)
