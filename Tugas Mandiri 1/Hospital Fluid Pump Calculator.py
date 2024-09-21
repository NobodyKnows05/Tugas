# Hospital Fluid Pump Calculator

def Input():
    try:
        volume = int(input("Volume to be infused (ml) => "))
        time = int(input("Minutes over which to infuse => "))
        converted_time = time/60
        rate = volume/converted_time
    except:
        print("Try again!")
        Input()
    else:
        print("VTBI: {} ml".format(volume))
        print("Rate {} ml/hr".format(rate))

Input()