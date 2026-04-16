from PIL import Image
import numpy as np

def analyze_grid():
    img = Image.open('tarjetas.png').convert('L')
    data = np.array(img)
    height, width = data.shape
    
    # Calculate average brightness per row
    row_avg = np.mean(data, axis=1)
    
    # Analyze columns too
    col_avg = np.mean(data, axis=0)
    
    print(f"Image Size: {width}x{height}")
    
    # Find potential Row boundaries (labels are dark/black bars)
    # We look for dips in brightness
    print("\n--- Row Analysis (Top 500 rows example) ---")
    for i in range(0, height, 10):
        print(f"Row {i:4}: {row_avg[i]:.1f}")

if __name__ == "__main__":
    analyze_grid()
