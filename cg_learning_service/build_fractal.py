import os

import numpy as np
import matplotlib.pyplot as plt
from django.conf import settings

ITERATIONS = 10


def build_fractal(c, scale, color_scheme='hot', initial_iterations=ITERATIONS, alter_fractal=None, iterations=None):
    width = 480
    height = 320

    global ITERATIONS

    if initial_iterations:
        ITERATIONS = initial_iterations

    if alter_fractal:
        ITERATIONS = (ITERATIONS + iterations if alter_fractal == 'increase' else ITERATIONS - iterations
                      if alter_fractal == 'decrease' else ITERATIONS)
        if ITERATIONS < 0:
            ITERATIONS = 10

    x = np.linspace(-width / scale, width / scale, num=width).reshape((1, width))
    y = np.linspace(-height / scale, height / scale, num=height).reshape((height, 1))
    Z = np.tile(x, (height, 1)) + 1j * np.tile(y, (1, width))

    C = np.full((height, width), c)
    M = np.full((height, width), True, dtype=bool)
    N = np.zeros((height, width))
    for i in range(ITERATIONS):
        Z[M] = Z[M] * Z[M] + C[M]
        M[np.abs(Z) > 2] = False
        N[M] = i

    # Save with Matplotlib using a colormap.
    fig = plt.figure()
    fig.set_size_inches(width / 100, height / 100)
    ax = fig.add_axes([0, 0, 1, 1], frameon=False, aspect=1)
    ax.set_xticks([])
    ax.set_yticks([])
    plt.imshow(np.flipud(N), cmap=color_scheme)
    plt.savefig(os.path.join(settings.BASE_DIR, 'cg_learning_service', 'static', 'images', 'fractal.png'))
    plt.close()
