# BMI Calculator

def Calculate():
    try:
        weight = float(input("Enter your own weight (pounds) => "))
        height = float(input("Enter your own height (inches) => "))
    except:
        print("Try again!")
        Calculate()
    else:
        BMI = (703*weight)/height**2
        if BMI < 18.5:
            indicator = "Underweight"
        if 18.5 < BMI < 24.9:
            indicator = "Normal"
        if 25 < BMI < 29.9:
            indicator = "overweight"
        if BMI > 30:
            indicator = "Obese"
        print("Your body categorized as ",format(indicator))

Calculate()