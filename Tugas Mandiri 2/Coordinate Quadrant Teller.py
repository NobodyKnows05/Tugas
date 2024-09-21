# Coordinate Quadrant Teller

def coordinate():
    try:
        coordinate_x = float(input("Enter the x coordinate => "))
        coordinate_y = float(input("Enter the y coordinate => "))
    except ValueError:
        print("Try again!")
        coordinate()
        return

    if coordinate_x > 0:
        if coordinate_y > 0:
            print("({}, {}) is in quadrant I".format(coordinate_x, coordinate_y))
        elif coordinate_y < 0:
            print("({}, {}) is in quadrant IV".format(coordinate_x, coordinate_y))
        else:
            print("({}, {}) lies on the positive x-axis".format(coordinate_x, coordinate_y))
    elif coordinate_x < 0:
        if coordinate_y > 0:
            print("({}, {}) is in quadrant II".format(coordinate_x, coordinate_y))
        elif coordinate_y < 0:
            print("({}, {}) is in quadrant III".format(coordinate_x, coordinate_y))
        else:
            print("({}, {}) lies on the negative x-axis".format(coordinate_x, coordinate_y))
    else:
        if coordinate_y > 0:
            print("({}, {}) lies on the positive y-axis".format(coordinate_x, coordinate_y))
        elif coordinate_y < 0:
            print("({}, {}) lies on the negative y-axis".format(coordinate_x, coordinate_y))
        else:
            print("({}, {}) is the origin".format(coordinate_x, coordinate_y))

coordinate()
