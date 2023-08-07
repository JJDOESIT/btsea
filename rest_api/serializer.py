from rest_framework import serializers

class create_user_serializer(serializers.Serializer):
    email = serializers.EmailField()
    password =serializers.CharField()

class login_user_serializer(serializers.Serializer):
    email = serializers.EmailField()
    password =serializers.CharField()

