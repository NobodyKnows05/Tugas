# Student Purchases Calculator

def Input():
    try:
        purchase_total = float(input("Enter the purchase total: $"))
        is_student = input("Are you a student? (yes/no): ").lower()
    except:
        print("Try again!")
        Input()
    else:
        if is_student == "yes":
            discount = 0.20 * purchase_total
        else:
            discount = 0
        sales_tax = 0.05 * (purchase_total - discount)
        final_total = purchase_total - discount + sales_tax

        print(f"Purchase total: ${purchase_total:.2f}")
        print(f"Discount: ${discount:.2f}")
        print(f"Sales tax: ${sales_tax:.2f}")
        print(f"Final total: ${final_total:.2f}")

Input()