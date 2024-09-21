# Hypotenuse Calculator
import math

def Input():
    try:
        side1 = int(input("Input the side 1 length => "))
        side2 = int(input("Input the side 2 length => "))
        hypotenuse = math.sqrt(side1**2+side2**2)
    except:
        print("Try again!")
        Input()
    else:
        print("The triangle hypotenuse is {}".format(hypotenuse))

Input()