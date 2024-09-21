numbers = input("Input the numbers! ")
x, i = 0, 0
splited_num = list(numbers)
len = len(splited_num)
while i < len:
    x += int(splited_num[i])**len
    i += 1
if x == int(numbers):
    print("That is an Armstrong numbers!")
else: print("These are not!")
print(x)