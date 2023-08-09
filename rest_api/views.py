from rest_framework.response import Response
from rest_framework.views import APIView
from backend_db_app.models import CustomUser
from .serializer import create_user_serializer, login_user_serializer
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from bitcoinlib.wallets import Wallet
from bitcoinlib.wallets import *
import os

def verify_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    email_path = os.path.abspath("btsea/rest_api/templates/verify_email.html")
    message = render_to_string(email_path, {"uid": uid, "token": token})
    send_mail(
        "Verify Account", message, "securebtc@gmail.com", ["cuddletogs@gmail.com"]
    )

class create_model_user(APIView):
    def post(self, request):
        data = request.data
        serializer = create_user_serializer(data=data)
        if serializer.is_valid():
            response = CustomUser.objects.create_user(
                data["email"], request.data["password"]
            )
            status_code = response["Status"]
            if status_code == 200:
                user = CustomUser.objects.get(email=data["email"])
                verify_email(user)
            return Response(status=status_code)
        else:
            return Response(status=400)


class login_model_user(APIView):
    def post(self, request):
        data = request.data
        serializer = login_user_serializer(data=data)
        if serializer.is_valid():
            user = authenticate(email=data["email"], password=data["password"])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return Response(
                        {"email": user.email, "user_id": user.pk, "status": 200}
                    )
                else:
                    return Response(status=400)
            else:
                return Response(status=401)
        return Response(status=404)


class verify_auth_user(APIView):
    def post(self, request):
        return Response(status=200)


class user_logout(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response(data={"status": "200"})
        except:
            return Response(status=400)


class fetch_user_wallet(APIView):
    def post(self, request):
        try:
            user_wallet = Wallet(request.user.email)
            user_wallet_name = user_wallet.name
            user_wallet.transactions_update(network="testnet")
            user_wallet.utxos_update()
            user_address = user_wallet.get_key().address
            user_balance = user_wallet.balance()
            user_transactions = user_wallet.transactions(as_dict=True)
            for transaction in user_transactions:
                transaction.pop("transaction")
                transaction.pop("script")
            print(user_wallet.info())
        except:
            return Response(status=404)
        return Response(
            data={
                "address": user_address,
                "balance": user_balance / 10**8,
                "wallet_name": user_wallet_name,
                "transactions": user_transactions,
                "status": 200,
            }
        )

class create_user_wallet(APIView):
    def post(self, request):
        try:
            Wallet.create(request.user.email, network="testnet")
        except:
            return Response(status=404)
        return Response(data={"message": "success", "status": 200})
