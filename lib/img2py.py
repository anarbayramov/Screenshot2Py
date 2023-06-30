from PIL import Image
import pytesseract
import numpy as np
import sys

filename = f"{sys.argv[1]}"

img1 = np.array(Image.open(filename))
text = pytesseract.image_to_string(img1)

f = open(f"{sys.argv[1]}.py", "a")
f.write(text)
f.close()
