import os

from PIL import Image
from io import BytesIO

from django.conf import settings
import cv2
import numpy as np

RGB_SCALE = 255
CMYK_SCALE = 100


def rgb_to_cmyk(r, g, b):
    if (r, g, b) == (0, 0, 0):
        # black
        return 0, 0, 0, CMYK_SCALE

    # rgb [0,255] -> cmy [0,1]
    c = 1 - r / RGB_SCALE
    m = 1 - g / RGB_SCALE
    y = 1 - b / RGB_SCALE

    # extract out k [0, 1]
    k = 1 - max(r, g, b) / RGB_SCALE
    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)
    k = k

    # rescale to the range [0,CMYK_SCALE]
    return round(c * CMYK_SCALE), round(m * CMYK_SCALE), round(y * CMYK_SCALE), round(k * CMYK_SCALE)


def get_cmyk_array(image):
    return np.array([[rgb_to_cmyk(*image.getpixel((x, y))) for x in range(image.width)] for y in range(image.height)])


def change_rgb_to_cmyk(image_to_transform):
    image = Image.open(BytesIO(image_to_transform.read()))
    cmyk_array = get_cmyk_array(image)
    # new_image = Image.fromarray(cmyk_array, mode="CMYK")
    new_image = image.convert('CMYK')
    new_image.save(os.path.join(settings.BASE_DIR, 'cg_learning_service', 'static', 'images', 'colors.jpeg'))
    return new_image

