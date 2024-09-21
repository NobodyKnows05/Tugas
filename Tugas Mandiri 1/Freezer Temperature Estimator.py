# Freezer Temperature Estimator

def Input():
    try:
        time = input("Input the time (in hour) => ").split()
        hour = int(time[0])
        converted_minute = int(time[1])/60
        converted_time = hour + converted_minute
    except:
        print("Try again!")
        Input()
    else:
        result = ((4*converted_time**2)/converted_time+2)-20
        return result
    
result = Input()

print("The temperature value is {} degree Celcius".format(result))