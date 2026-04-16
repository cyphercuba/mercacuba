from PIL import Image
import os

def split_perfectly():
    img = Image.open('tarjetas.png')
    
    # Detected dividers from find_grid.py
    rows = [12, 278, 547, 816, 1092, 1350]
    cols = [15, 265, 514, 761, 1004]
    
    slugs = [
        "huevos-lacteos", "carnicos", "dulces-helados", "aseo-cuidado-personal",
        "cenas-bufets", "electrodomesticos", "pescados-mariscos", "bebidas",
        "agro", "farmacia", "ferreteria", "alimentos-preelaborados",
        "limpieza-utiles", "regalos", "piezas-accesorios", "hogar-mobiliario",
        "infantiles-escolares", "moda-accesorios", "bebe", "otros"
    ]
    
    output_dir = 'public/assets/categories'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for i, slug in enumerate(slugs):
        c_idx = i % 4
        r_idx = i // 4
        
        # Cell boundaries
        left = cols[c_idx]
        top = rows[r_idx]
        right = cols[c_idx + 1]
        bottom = rows[r_idx + 1]
        
        # To get a clean 200x200 square that avoids the labels:
        # We take the top part of the cell.
        # Most images have the label in the bottom 50-60 pixels.
        # Height of cell is ~268px.
        
        width = right - left
        height = bottom - top
        
        # Center crop a square
        side = min(width, height) - 60 # Leave 60px for the label at bottom
        
        new_left = left + (width - side) // 2
        new_top = top + 10 # Slight offset from the top border
        new_right = new_left + side
        new_bottom = new_top + side
        
        crop_box = (new_left, new_top, new_right, new_bottom)
        
        category_img = img.crop(crop_box)
        # Resize to 400x400 for high quality display
        category_img = category_img.resize((400, 400), Image.Resampling.LANCZOS)
        category_img.save(f'{output_dir}/{slug}.png')
        print(f'Saved {slug}.png (Perfect Circular Target)')

if __name__ == "__main__":
    split_perfectly()
