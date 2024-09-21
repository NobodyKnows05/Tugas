# Playing With The String

def Input():
    try:
        num = int(input("How many it will iterate! "))
        word = str(input("Input the word to rearrange! "))
    except:
        print("Try Again!")
        input()
    else:
        rearranged_str, normal_str = word[0:num], word[num:]
        result = normal_str + rearranged_str
        print(result)

Input()
