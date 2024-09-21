# Yard Grass Cut Calculator

def Input():
    try:
        yard_length = int(input("Input the yard length => "))
        yard_width = int(input("Input the yard width => "))
        house_length = int(input("Input the house length => "))
        house_width = int(input("Input the house width => "))
        grass_area = yard_length*yard_width-house_length*house_width
        calculated_time = grass_area/2
    except:
        print("Try again!")
        Input()
    else:
        print("The time may required to cut the grass => {} seconds".format(calculated_time))

Input()