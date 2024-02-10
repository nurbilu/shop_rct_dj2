from asyncio import Task
from django.contrib.auth.models import User
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from base.models import Product
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.core.exceptions import ObjectDoesNotExist
import json

@api_view(['GET'])
def index(req):
    return Response('hello')

# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        # ...
        return token

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
# def products(req):
#     if req.method =='GET':
#         user= req.user
#         temp_task=user.product_set.all()
#         return Response(ProductSerializer(temp_task, many=True).data)



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Task.objects.create(**validated_data,user=user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    return Response('private zone')


@api_view(['GET'])
def test(request):
    return Response('public zone')


# register
@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = False
    user.save()
    return Response("new user born")


# add to CRUD later -when implementing login and authentication again
# @permission_classes([IsAuthenticated])
# @renderer_classes((TemplateHTMLRenderer, JSONRenderer))

# CRUD 
@api_view(['GET'])
def list_products(request):
    cat = request.GET.get('cat')
    if cat:
        products = list(Product.objects.filter(cat=cat).values())
    else:
        products = list(Product.objects.all().values())
    return Response(products)

@api_view(['GET'])
def list_products(request):
    products = list(Product.objects.all().values())
    return Response(products)

@api_view(['POST'])
def add_product(request):
    data = request.data
    product = Product.objects.create(**data)
    return Response({"id": product.id, "title": product.title, "price": product.price, "category": product.cat})

@api_view(['DELETE'])
def delete_product(request, id):
    try:
        product = Product.objects.get(id=id)
        product.delete()
        return Response({'message': 'Product deleted successfully!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

@api_view(['PUT'])
def update_product(request, id):
    data = request.data
    try:
        product = Product.objects.get(id=id)
        for field, value in data.items():
            setattr(product, field, value)
        product.save()
        return Response({"id": product.id, "title": product.title, "price": product.price, "category": product.category})
    except ObjectDoesNotExist:
        return Response({'error': 'Product not found'}, status=404)











