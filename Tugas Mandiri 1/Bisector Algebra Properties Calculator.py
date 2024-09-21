# Bisector Algebra Properties Calculator

def input_coordinate():
    try:
        X1 = float(input("Input first point X coordinate => "))
        Y1 = float(input("Input first point Y coordinate => "))
        X2 = float(input("Input second point X coordinate => "))
        Y2 = float(input("Input second point Y coordinate => "))
    except ValueError:
        print("Numbers only input. Retry again!")
        input_coordinate()
    else:
        return X1, X2, Y1, Y2

X1, X2, Y1, Y2 = input_coordinate()
bisector_perpendicular_slope = 0

try:
    segment_slope = (Y2-Y1)/(X2-X1)
    bisector_perpendicular_slope = -(X2-X1)/(Y2-Y1)
except:
    if X2-X1 == 0:
        segment_slope = "Indefinite"
    if Y2-Y1 == 0:
        bisector_perpendicular_slope = "Indefinite"
finally:
    segment_x_midpoint, segment_y_midpoint = (X1+X2)/2, (Y1+Y2)/2
    try:
        y_intercept_segment = segment_y_midpoint-segment_slope*segment_x_midpoint
        y_intercept_perpendicular_bisector = -bisector_perpendicular_slope*segment_x_midpoint+segment_y_midpoint
    except:
        if segment_slope == "Indefinite":
            y_intercept_segment = "Indefinite"
        if bisector_perpendicular_slope == "Indefinite" or ZeroDivisionError:
            y_intercept_perpendicular_bisector = "Indefinite"

print("\nThe segment slope => {}".format(segment_slope))
print("The segment midpoint => ({}, {})".format(segment_x_midpoint, segment_y_midpoint))
print("The segment y-intercept => {}".format(y_intercept_segment))
print("The bisector perpendicular slope => {}".format(bisector_perpendicular_slope))
print("The bisector y-intercept => {}".format(y_intercept_perpendicular_bisector))
print("The bisector segment coordinates => ({}, {}) and ({}, {})".format(X1, Y1, X2, Y2))

if segment_slope == "Indefinite":
    print("The perpendicular bisector equation => y = {}".format(segment_y_midpoint))
elif bisector_perpendicular_slope == "Indefinite":
    print("The perpendicular bisector equation => x = {}".format(segment_x_midpoint))
else:
    print("The perpendicular bisector equation => y = {}x + {}".format(bisector_perpendicular_slope, (-bisector_perpendicular_slope*segment_x_midpoint+segment_y_midpoint)))
