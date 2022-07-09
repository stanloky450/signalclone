import React, {useState, useEffect,createContext} from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';
import { useAuthContext } from '../../contexts/AuthContext';


export default function UserItem({ user }) {
  
  const navigation = useNavigation();

  const { dbUser } = useAuthContext();
  

  const onPress = async () => {

    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.

    // Create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({newMessages:0}));


    await DataStore.save(new ChatRoomUser({
      user: dbUser,
      chatRoom: newChatRoom   //chatroom
      
    }))
   

    // connect clicked user with the chat room
    await DataStore.save(new ChatRoomUser({
      user: user,
      chatRoom: newChatRoom  //chatroom
      
   }));

    // navigation.navigate('ChatRoom');
    navigation.navigate('ChatRoom', { id: newChatRoom.id });
    
  }




  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.imageUri}} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

