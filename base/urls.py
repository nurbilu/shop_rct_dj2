from django.contrib import admin
from django.urls import path
from base import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import list_products, add_product, delete_product, update_product


urlpatterns = [
    path('', views.index),
    path('login/', views.TokenObtainPairView.as_view()),
    path('test/', views.test), #public zone
    path('getNotes', views.getNotes), # private zone
    path('register/', views.register),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', list_products, name='list_products'),
    path('products/add/', add_product, name='add_product'),
    path('products/delete/<int:id>/', delete_product, name='delete_product'),
    path('products/update/<int:id>/', update_product, name='update_product'),
]
