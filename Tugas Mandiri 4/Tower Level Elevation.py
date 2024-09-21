raw_input, used_energy = str(input()).split(), 0
floor_num, total_energy, act_num = map(int, raw_input)
floor_energy = str(input()).split()
for _ in range(act_num):
    raw_input = str(input()).split()
    start, end = map(int, raw_input)
    for index in range(start-1, end-1):
        used_energy += int(floor_energy[index])

energy_diff = total_energy - used_energy
if energy_diff >= 0:
    print("EZ banget, energiku sisa {}!".format(energy_diff))
else:
    print("NT, kurang {} energi sih.".format(-energy_diff))