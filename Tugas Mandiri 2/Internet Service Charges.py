# Internet Service Charges

def Charges():
    try:
        data_usage = float(input("How much is your data usage for months? Gbs"))
    except:
        print("Try again!")
        Charges()
    else:
        if data_usage <= 1:
            charge = 250
        elif 1 < data_usage <= 2:
            charge = 500
        elif 2 < data_usage <= 5:
            charge = 1000
        elif 5 < data_usage <= 10:
            charge = 1500
        elif data_usage > 10:
            charge = 2000
        else:
            print("No negative input!")
            Charges()
        print("Your monthly data usage charges is {}$", format(charge))

Charges()