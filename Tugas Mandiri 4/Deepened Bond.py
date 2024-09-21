"""
    This function will test all 4-digit quadratic sum loops, where if there is
    at least 1 that returns True then the return value will print the word LEAVE
    on the screen, otherwise it will print the word ERASE.
"""
def is_sum_of_four_squares(num):
    floored_num = int(num**0.5) + 1
    for a in range(1, floored_num):
        for b in range(a, floored_num):
            for c in range(b, floored_num):
                for d in range(c, floored_num):
                    if a*a + b*b + c*c + d*d == num:
                        return True
    return False

# Variable Input
num_cases = int(input())
for _ in range(num_cases):
    num = int(input())
    if is_sum_of_four_squares(num):
        print("LEAVE")
    else:
        print("ERASE")