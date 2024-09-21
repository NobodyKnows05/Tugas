#Lili Lala

def last_man_standing(N, C):
    if N % C == 0:
        return "Lili"
    else:
        return "Lala"

N = int(input("Masukkan jumlah bola (N): "))
C = int(input("Siapa yang mulai duluan? (1 untuk Lala, 2 untuk Lili): "))

pemenang = last_man_standing(N, C)
print(f"Pemenang Last Man Standing adalah: {pemenang}")