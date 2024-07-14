# server.py
import sys
from fhe import fhe_encrypt

def main():
    return "Hello from main!"

async def fhe():
    # return "fhe"
    res = await fhe_encrypt("./", "spector.csv")
    return res

def test():
    return "test"

def handle_request(method):
    if method == "main":
        return main()
    elif method == "test":
        return test()
    elif method == "fhe":
        return fhe()
    else:
        return "Unknown method"

if __name__ == "__main__":
    method = sys.argv[1]
    result = handle_request(method)
    print(result)
