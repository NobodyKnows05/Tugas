# Locked

def Input():
    try:
        word = str(input("Input the word to decode! "))
    except:
        print("Try Again!")
        input()
    else:
        string = ""
        for check in word:
            if check not in string:
                string += check
        string = string.replace(" ", "")
        print(string)

Input()
