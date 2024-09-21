# Taxi Fare Calculator

def Input():
    try:
        beginning_odometer = float(input("Enter beginning odometer reading => "))
        ending_odometer = float(input("Enter ending odometer reading =>"))
    except:
        print("Try again!")
    else:
        distance = ending_odometer-beginning_odometer
        fare = distance*1.5
        return distance, fare

distance, fare = Input()

print("You traveled a distance of {} miles. At $1.50 per mile, your fare is {}$.".format(distance, fare))