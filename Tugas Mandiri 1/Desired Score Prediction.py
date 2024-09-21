# Desired Score Prediction

grades = {"A":86,"AB":76,"B":66,"BC":61,"C":56,"D":41,"E":0}

def first_input():
    try:
        desired_grade = str(input("Enter desired grade> ")).upper()
        required_average = float(input("Enter minimum average required> "))
    except:
        print("Retry again!")
        first_input()
    else:
        if float(grades[desired_grade]) > required_average:
            print("It's seems too low! regrade again!")
            first_input()
        return desired_grade, required_average

def second_input():
    try:
        current_average = float(input("Enter current average in course> "))
        final_percentage = float(input("Enter how much the final counts as a percentage of the course grade> "))
    except:
        print("Retry again!")
        second_input()
    else:
        if current_average > 100.0 or final_percentage > 100.0:
            print("That's too large!")
            second_input()
        return current_average, final_percentage

desired_grade, required_average = first_input()
current_average, final_percentage = second_input()

rest_percentage = 100.0 - final_percentage
score_prediction = (required_average*100.0-rest_percentage*current_average)/final_percentage

final_statement = "You need a score of {} on the final to get {}"
print(final_statement.format(score_prediction, desired_grade))