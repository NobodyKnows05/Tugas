# Hydroelectric Dam Power Calculation

gravity = 9.8 #In m/s^2
liquid_flow = 1.3e3 #Equal to 1300
efficiency = 0.9 #Equal to 90%
height = 170 #In meters
watt_to_Mwatt = 1e6 #Convert watt unit to Megawatt unit

mass = liquid_flow
energy = (gravity*height*mass*efficiency)/watt_to_Mwatt

string = "The amount energy may produced by hydroelectric dam is {} Megawatt!"
print(string.format(energy))