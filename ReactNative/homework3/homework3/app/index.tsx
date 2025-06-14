import { Text, View, Pressable } from "react-native";
import MyButton from "@/components/Button";
import React, { useState } from "react";
import MyTextInput from "@/components/TextInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);

  const handleChangePage = () => {
    setIsSignUp(!isSignUp);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleToggleNewsletter = () => {
    setReceiveNewsletter(!receiveNewsletter);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'white',
        }}
      >
        <View
        style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          marginBottom: 20,
          marginTop: -50
        }}>
          <Text style={{fontSize: 18, color: 'gray'}}>x</Text>
          <Text style={{
            fontSize: 30,
            fontWeight: 600
          }}>
            {isSignUp ? "Sign Up" : "Login"}
          </Text>
          <MyButton 
            text={isSignUp ? "Login" : "Sign Up"}
            onPress={handleChangePage}
            textColor="green"
            style={{}}
          />
        </View>

        <MyTextInput 
          placehold="Name"
        />
        {isSignUp && (
          <MyTextInput 
            placehold="Email"
          />
        )}
        
        <MyTextInput 
          placehold="Password"
          secureTextEntry={true}
          onTogglePassword={handleShowPassword}
          showPassword={showPassword}
        />
        {isSignUp && (
                  <Pressable
                  onPress={handleToggleNewsletter}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                    marginTop: 10
                  }}>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginRight: 10,
                      marginBottom: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: receiveNewsletter ? 'green' : 'transparent'
                    }}>
                    {receiveNewsletter && <Text style={{color: 'white'}}>✓</Text>}
                  </View>
                  <Text style={{flex: 1}}>
                    I would like to receive your newsletter and other promotional information.
                  </Text>
                </Pressable>
        )}


        <MyButton
          text={isSignUp ? "Sign Up" : "Login"}
          onPress={() => {}}
          textColor="white"
          style={{
            backgroundColor: "green",
            paddingVertical: 15,
            borderRadius: 30,
            width: '90%',
            marginTop: isSignUp ? 350 : 458,
            alignItems: 'center'
          }}
        />

        <MyButton
          text="Forgot your password?"
          onPress={() => {}}
          textColor="green"
          style={{
            borderRadius: 30,
            width: '90%',
            marginTop: 20,
            alignItems: 'center'
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
