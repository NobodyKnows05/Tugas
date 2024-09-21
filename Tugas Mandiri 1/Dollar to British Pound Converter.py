# Dollar to British Pound Converter

Dollar_Amount = float(input("Enter the dollar amount! "))

Dollar_Value = 1.0
BPound_Value = 0.65
Multiply_Factor = BPound_Value/Dollar_Value
In_BPound_Value = Dollar_Amount*Multiply_Factor

string = "The Dollar value in British Pound exchange is {}"
print(string.format(In_BPound_Value))