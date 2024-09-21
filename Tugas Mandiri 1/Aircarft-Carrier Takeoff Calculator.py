# Aircarft-Carrier Takeoff Calculator

Takeoff_Speed = 278.0 #In km/h unit
Distance = 94.0 #In meters

Converted_Takeoff_Speed = Takeoff_Speed*5/18 #Converted into m/s unit
Time = 2*Distance/Converted_Takeoff_Speed
Acceleration = 2*Distance/Time**2

print("The minimum acceleration to takeoff is {} m/s^2".format(Acceleration))