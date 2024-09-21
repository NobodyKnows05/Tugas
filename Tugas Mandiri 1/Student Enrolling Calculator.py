# Student Enrolling Calculator

def Input():
    try:
        student_quantity = int(input("How many the students are there => "))
        section_enrolled = int(input("How many section may enrolled => "))
        student_remains = student_quantity-section_enrolled*30
    except:
        print("Try again!")
        Input()
    else:
        print("The students remain is {}".format(student_remains))

Input()