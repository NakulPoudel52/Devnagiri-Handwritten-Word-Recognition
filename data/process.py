import numpy as np
import cv2 
from matplotlib import pyplot as plt
window_name = 'Image'
def display_image(image):
        
    cv2.imshow(window_name, image)  
    cv2.waitKey(0) 
    cv2.destroyAllWindows() 
    
# read
img = cv2.imread('2.jpg')
grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY )
ret,thresh1 = cv2.threshold(grey,103,255,cv2.THRESH_BINARY)
display_image(thresh1)
inverted = cv2.bitwise_not(thresh1)
# # increase contrast
# pxmin = np.min(img)
# pxmax = np.max(img)
# imgContrast = (img - pxmin) / (pxmax - pxmin) * 255

# # increase line width
# kernel = np.ones((3, 3), np.uint8)
# imgMorph = cv2.erode(imgContrast, kernel, iterations = 1)

# write
cv2.imwrite('out2.jpg', thresh1)
cv2.imwrite("outI2.jpg",inverted)

