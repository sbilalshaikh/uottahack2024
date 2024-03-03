from django.shortcuts import render
from .models import NeighbourhoodData

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import ee
import json
import os
from django.http import JsonResponse
# Create your views here.


ee.Authenticate()
ee.Initialize(project='ee-methira19')

@api_view(['GET'])

def interpolate_color(value):
    # Define the RGB values for blue, white, and green
    blue = (0, 0, 255)
    white = (255, 255, 255)
    green = (0, 255, 0)

    # Interpolate between blue, white, and green based on the value
    if value <= 0:
        # Interpolate between blue and white
        r = int(blue[0] + (white[0] - blue[0]) * (1 + value))
        g = int(blue[1] + (white[1] - blue[1]) * (1 + value))
        b = int(blue[2] + (white[2] - blue[2]) * (1 + value))
    else:
        # Interpolate between white and green
        r = int(white[0] + (green[0] - white[0]) * value)
        g = int(white[1] + (green[1] - white[1]) * value)
        b = int(white[2] + (green[2] - white[2]) * value)

    # Convert RGB values to hex code
    hex_code = "#{:02x}{:02x}{:02x}".format(r, g, b)
    return hex_code

def process_geoJSON(request):
    geojson_folder = '../geoJSON'
    if (geojson_folder):
        for file in os.listdir(geojson_folder):
            fp = os.path.join(geojson_folder, file)

            with open(fp, 'r') as f:
                geojson_content = json.load(f)

            neighbourhood_f = ee.Feature(geojson_content)
            neighbourhood_fc = ee.FeatureCollection([neighbourhood_f])

            sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR') \
                .filterBounds(neighbourhood_fc) \
                .filterDate('2023-01-01', '2023-12-31') \
                .median()

            ndvi = sentinel2.normalizedDifference(['B8', 'B4'])

            ndvi_masked = ndvi.clip(neighbourhood_fc)

            mean_ndvi = ndvi_masked.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=neighbourhood_fc.geometry(),
                scale=10
            )

            mean_ndvi_value = mean_ndvi.getInfo()['nd']

            color = interpolate_color(mean_ndvi_value)

            neighbourhood_name = os.path.splitext(os.path.basename(fp))[0].replace("_", " ")
            print(color)
            print(f"Mean NDVI for {neighbourhood_name}: {mean_ndvi_value}")

            neighbourhood = NeighbourhoodData.objects.create(
                nvdi = mean_ndvi_value,
                name = neighbourhood_name,
                color = color
            )
            neighbourhood.save()

    return JsonResponse({'message': 'Mean NDVI calculation complete for all GeoJSON files.'})
