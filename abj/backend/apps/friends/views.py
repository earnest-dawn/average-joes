# apps/friends/views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Friend
from .serializers import FriendSerializer


class FriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Friend.objects.filter(user=user)
    
    @action(detail=False, methods=['get'])
    def friends(self, request):
        """Get list of accepted friends"""
        friends = Friend.objects.filter(user=request.user, status='ACCEPTED')
        serializer = FriendSerializer(friends, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get pending friend requests"""
        pending = Friend.objects.filter(user=request.user, status='PENDING')
        serializer = FriendSerializer(pending, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        """Accept friend request"""
        friend = self.get_object()
        friend.status = 'ACCEPTED'
        friend.save()
        return Response(FriendSerializer(friend).data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject friend request"""
        friend = self.get_object()
        friend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
