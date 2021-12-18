from django.urls import path, include
from. import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login_view, name="login"),
    path('register', views.register, name="register"),
    path('logout', views.logout_view, name="logout"),
    path('standings', views.standings, name="standings"),
    path('Team/<int:id>', views.team, name="team")
]
