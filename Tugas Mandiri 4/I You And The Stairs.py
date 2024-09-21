# Stairs Array Create
def Create_Stairs(word, reverse):
    size = range(0, int(word[0]))
    for iterate_1 in size:
        array, result = [], ""
        for _ in size:
            array.append(" ")
        for iterate_2 in range(0, iterate_1+1):
            if (iterate_1+iterate_2)%2 == 0:
                array[iterate_2] = "I"
            else:
                array[iterate_2] = "U"
        if reverse == True:
            array.reverse()
        for char in size:
            result += array[char] + " "
        result = result.rstrip()
        print(result)

# Input Function
def Input():
    word = str(input("Input the stairs height and the pronouns (Splitted by spaces)! ")).split()
    match word[1].lower():
        case "kamu":
            reverse = True
        case _:
            reverse = False
    Create_Stairs(word, reverse)
Input()