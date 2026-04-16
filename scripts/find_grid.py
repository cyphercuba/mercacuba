from PIL import Image
import numpy as np

def find_grid():
    img = Image.open('tarjetas.png').convert('L')
    data = np.array(img)
    height, width = data.shape
    
    # Average brightness
    row_avg = np.mean(data, axis=1)
    
    # Find row-dividers (white lines/gaps)
    # The grid items are separated by white lines (brightness ~254)
    row_dividers = []
    for y in range(height):
        if row_avg[y] > 250:
            if not row_dividers or row_dividers[-1] < y - 5:
                row_dividers.append(y)
    
    print(f"Row Dividers: {row_dividers}")
    
    # The image area starts at 0 and ends at the first big white area.
    # Actually, Row 1 is between RowDiv[i] and RowDiv[i+1]?
    # Let's see. 
    # If the first divider is at 268, then Row 1 is 0-268.
    
    # Find columns (should be 0, 256, 512, 768, 1024)
    # But let's verify if there are white vertical lines
    col_avg = np.mean(data, axis=0)
    col_dividers = []
    for x in range(width):
        if col_avg[x] > 250:
            if not col_dividers or col_dividers[-1] < x - 2:
                col_dividers.append(x)
    print(f"Col Dividers: {col_dividers}")

if __name__ == "__main__":
    find_grid()
