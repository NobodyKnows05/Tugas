# Gases Content Indicator

def Indicator():
    color = input("What the gases color? ")
    match color[0].lower():
        case "o":
            content = "ammonia"
        case "b":
            content = "carbon Monoxide"
        case "y":
            content = "hydrogen"
        case "g":
            content = "oxygen"
        case _:
            content = "unknown"
    print("The tube gases content is {}".format(content))

Indicator()