from django.contrib import admin
from .models import CommunityMember, FlowerInNeighbourhood, NeighbourhoodData

# Register your models here.
class MemberInline(admin.StackedInline):
    model = CommunityMember
    extra = 0

class FlowerInLine(admin.StackedInline):
    model = FlowerInNeighbourhood
    extra = 0

# Register your models here.
@admin.register(NeighbourhoodData)
class EventAdmin(admin.ModelAdmin):
    inlines=[MemberInline, FlowerInLine]

