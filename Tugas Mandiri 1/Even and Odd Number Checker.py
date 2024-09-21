x = int(input("Masukkan angka integer bulat => "))
if x > 0:
    if x%2 == 0:
        print("hi!")
    if x%2 == 1:
        print("ho!")
elif x < 0:
    if x%2 == 0:
        print("ha!")
    if x%2 == 1:
        print("he!")
else:
    print("Goblok!")