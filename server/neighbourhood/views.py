from django.shortcuts import render
import ee
import json
import os
from django.http import JsonResponse
from .models import NeighbourhoodData

from .models import NeighbourhoodData, FlowerInNeighbourhood, CommunityMember
# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import NeighbourhoodDataSerializer, CommunityMemberSerializer, FlowerInNeighbourhoodSerializer

# Create your views here.

ee.Authenticate()
ee.Initialize(project='ee-methira19')

@api_view(['GET'])
def get_community_info(request):
    name = request.GET.get('name', '')
    try:
        neighbourhood = NeighbourhoodData.objects.get(neighbourhood_name=name)
    except NeighbourhoodData.DoesNotExist:
        return Response({'error': 'Could not find city'}, status=status.HTTP_400_BAD_REQUEST)

    neighbourhood_serializer = NeighbourhoodDataSerializer(neighbourhood)
    flowers = FlowerInNeighbourhood.objects.filter(neighbourhood_to_flower_fk=neighbourhood.n_id)
    members = CommunityMember.objects.filter(neighbourhood_to_member_fk=neighbourhood.n_id)

    flower_serializer = FlowerInNeighbourhoodSerializer(flowers, many=True)
    member_serializer = CommunityMemberSerializer(members, many=True)

    response_data = {
        'neighbourhood': neighbourhood_serializer.data,
        'flowers': flower_serializer.data,
        'members': member_serializer.data
    }
    
    return Response(response_data, status=status.HTTP_200_OK)
    

def interpolate_color(value):
    # Define the RGB values for white and green
    white = (255, 255, 255)
    green = (0, 255, 0)

    # Adjust the value to fit in the range [0, 0.1]
    adjusted_value = min(max(value, 0), 0.1) / 0.1  # Scale value to fit in [0, 1]

    # Interpolate between white and green based on the adjusted value
    r = int(white[0] + (green[0] - white[0]) * adjusted_value)
    g = int(white[1] + (green[1] - white[1]) * adjusted_value)
    b = int(white[2] + (green[2] - white[2]) * adjusted_value)

    # Convert RGB values to hex code
    hex_code = "#{:02x}{:02x}{:02x}".format(r, g, b)
    return hex_code

@api_view(['GET'])
def process_geoJSON(request):
    geojson_folder = '../geoJSON'
    if (geojson_folder):
        for file in os.listdir(geojson_folder):
            if ()
            fp = os.path.join(geojson_folder, file)

            with open(fp, 'r') as f:
                geojson_content = json.load(f)

            if NeighbourhoodData.objects.filter(neighbourhood_name=neighbourhood_name).exists():
                print(f"Neighbourhood {neighbourhood_name} already exists. Skipping...")
                continue  # Skip processing this GeoJSON file

            neighbourhood_f = ee.Feature(geojson_content)
            neighbourhood_fc = ee.FeatureCollection([neighbourhood_f])

            sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR') \
                .filterBounds(neighbourhood_fc) \
                .filterDate('2023-01-01', '2023-12-31') \
                .median()

            ndvi = sentinel2.normalizedDifference(['B8', 'B4'])

            print(ndvi.getInfo())

            ndvi_masked = ndvi.clip(neighbourhood_fc)

            mean_ndvi = ndvi_masked.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=neighbourhood_fc.geometry(),
                scale= 10
            )

            mean_ndvi_value = mean_ndvi.getInfo()['nd']

            color = interpolate_color(mean_ndvi_value)

            neighbourhood_name = geojson_content["properties"]["name"]
            print(f"Mean NDVI for {neighbourhood_name}: {mean_ndvi_value}")
            neighbourhood = NeighbourhoodData.objects.create(
                ndvi = mean_ndvi_value,
                neighbourhood_name = neighbourhood_name,
                color = color,
                geoJSON = geojson_content
            )
            neighbourhood.save()
            print(neighbourhood.color)

    return JsonResponse({'message': 'Mean NDVI calculation complete for all GeoJSON files.'})

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world'})


@api_view(['GET'])
def get_all(request):
    try:
        results = []
        neighborhoods = NeighbourhoodData.objects.all()
        for neighborhood in neighborhoods:
            neighborhood_serialized = NeighbourhoodDataSerializer(neighborhood)
            results.append(neighborhood_serialized.data)
        res = {'neighbourhoods': results}
        # Serialize the queryset into JSON
        return Response(res, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)