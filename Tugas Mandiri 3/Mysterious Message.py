# Mysterious Message

def Input():
    try:
        word = str(input("Input the word! "))
        length = int(input("How long the code will be decrypted! "))
        code = str(input("Input the clue code! ")).split()
    except:
        print("Try Again!")
        input()
    else:
        iterate = 0
        result = ""
        while iterate <= length-1:
            result += word[int(code[iterate])]
            iterate += 1
        print(result)

Input()
