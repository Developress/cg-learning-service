import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cg_learning_service.build_fractal import build_fractal
from cg_learning_service.change_brightness import change_brightness
from cg_learning_service.change_rgb_to_cmyk import change_rgb_to_cmyk


def index(request):
    return render(request, 'homepage.html')


def fractals(request):
    return render(request, 'fractals.html')


def colors(request):
    return render(request, 'colors.html')


@csrf_exempt
def create_fractal(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    color_scheme = body['color_scheme']
    scale = int(body['scale'])
    real = float(body['real'])
    imaginary = float(body['imaginary'])
    initial_iterations = int(body['initial_iterations']) if body['initial_iterations'] else None
    alter_fractal = body['alter_fractal']
    iterations = int(body['iterations']) if body['iterations'] else None

    c = complex(real, imaginary)

    build_fractal(c, scale, color_scheme, initial_iterations, alter_fractal, iterations)
    return HttpResponse('Fractal created successfully')


@csrf_exempt
def change_color_scheme(request):
    image = request.FILES['image']
    new_image = change_rgb_to_cmyk(image)
    response = HttpResponse(content_type='image/jpg')
    new_image.save(response, "JPEG")
    return response


@csrf_exempt
def change_image_brightness(request):
    brightness = int(request.GET.get('brightness'))
    image = request.FILES['image']
    new_image = change_brightness(image, brightness)
    response = HttpResponse(content_type='image/jpg')
    new_image.save(response, "JPEG")
    return response
