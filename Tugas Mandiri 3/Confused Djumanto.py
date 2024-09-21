# Confused Djumanto

def Program():
    try:
        # Variable Initiation
        binlist, spl_binlist, itr1, result= [], [], 1, ""

        # Variable Input
        rows = int(input("How many are the codeline? (In range 1 and 10)! "))
        print("Input the code number (In range 538.976.288 and 2.147.483.647)!")

        # Input Repeater
        while itr1 <= rows:
            binlist.append(str(bin(int(input("=> ")))).replace("b",""))     # This will input the integer first then convert it into binary. But will stored as string format. The "b" character must be removed away!
            itr1 += 1
    except:
        # Program Error Exception
        print("Try Again!")
        Program()
    else:
        # Processing the 'Binary' string into ASCII Character
        for iterate1 in range(0, rows):     # This iteration will read the rows sequence
            temp_str = binlist[iterate1]    # The variable will be changed when the first iteration cycle repeated again
            for iterate2 in range(0,4):     # This iteration will read the string characters
                start = iterate2*8          # The "Start" string slice index
                end = (iterate2+1)*8        # The "End" string slice index
                sliced_str = str(temp_str[start:end])           # This will slice the the 'Binary' string into 4 sections of 8 characters
                spl_binlist.append(chr(int(hex(sliced_str))))     # This will put all the processed 'Binary' to ASCII character into a list. The 'Binary' is converted into integer with integer SupportIndex format by 2 (Binary to Integer Converter)

        # List To String Converter
        for char in spl_binlist:
            result += char
        print("The decracked code is " + result)    # This will print the result immediately

# Initiate The Program
Program()