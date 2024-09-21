# Prime Checker
import math

def Prime_Check():
    prime1, prime2 = False, False
    Number = int(input("Input the numbers (Integer)! "))
    for i in range(2, (Number//2)+1):
        if Number%i == 0:
            prime1 = True
            break
        else:
            prime2 = False
    if prime1 == prime2:
        print("This is a prime number!")
    else:
        print("This is not a prime number")

result = Prime_Check()