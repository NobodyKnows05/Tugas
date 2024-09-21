def Jump(jump):
    max_distance = int(jump[0])
    bisa_lompat = True  # Kita asumsikan pemain bisa lompat sampai terbukti sebaliknya

    for distance in jump[1:]:
        if int(distance) > max_distance:
            bisa_lompat = False
            break

    if bisa_lompat:
        print("YA, DIA BISA!")
    else:
        print("TIDAK, DIA TIDAK BISA!")

jump = input("Masukkan jarak dari O-A, A-B, B-C, C-D, dan D-E (dipisahkan oleh spasi): ").split()
Jump(jump)