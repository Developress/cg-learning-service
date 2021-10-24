import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cg_learning_service.build_fractal import build_fractal


def index(request):
    return render(request, 'homepage.html')


def fractals(request):
    return render(request, 'fractals.html')


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
