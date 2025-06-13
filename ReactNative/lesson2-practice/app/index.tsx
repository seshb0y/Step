import { Pressable, Text, TextInput, View, Image } from "react-native";
import { useState } from "react";
import Icon from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <Text 
      style={{
        paddingHorizontal: 120,
        marginBottom: 70,
        fontSize: 20,
        lineHeight: 19,
      }}>
        Create Account
      </Text>
      <View
      style={{
        width: "80%",
        alignItems: "flex-start",
      }}>
        <Text
        style={{
          fontSize: 16,
          lineHeight: 17,
          fontWeight: 400
        }}>
          Username
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          borderRadius: 5, 
          padding: 8, 
          width: '100%',
          backgroundColor: "rgb(248, 248, 248)"
         }}>
          <Icon name="user" size={20} color={username ? 'rgb(96, 181, 250)' : 'rgb(219, 219, 219)'} style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={{
               flex: 1
              }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 17,
            fontWeight: 400,
            marginTop: 20,
          }}>
          Email or Phone number
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          borderRadius: 5, 
          padding: 8, 
          width: '100%',
          backgroundColor: "rgb(248, 248, 248)"
         }}>
          <Icon name="envelope" size={20} color={emailOrPhone ? 'rgb(96, 181, 250)' : 'rgb(219, 219, 219)'} style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Enter your email or number"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            style={{ flex: 1 }}
            keyboardType="email-address"
          />
        </View>

        <Text
          style={{
            fontSize: 16,
            lineHeight: 17,
            fontWeight: 400,
            marginTop: 20,
          }}>
          Password
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          borderRadius: 5, 
          padding: 8, 
          width: '100%',
          backgroundColor: "rgb(248, 248, 248)"
         }}>
          <Icon name="lock" size={20} color={password ? 'rgb(96, 181, 250)' : 'rgb(219, 219, 219)'} style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1 }}
            secureTextEntry={!showPassword}
          />
          <Icon 
            name={showPassword ? "eye" : "eye-slash"} 
            size={20} 
            color="gray" 
            onPress={() => setShowPassword(!showPassword)} 
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
      <Pressable
        style={{
          paddingVertical: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(74, 171, 248)',
          borderRadius: 10,
          width: '80%',
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Create Account</Text>
      </Pressable>
      <Text
        style={{
          marginTop: 20,
          fontSize: 14,
          color: 'gray',
        }}
      >
        or use social account
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgb(248, 248, 248)',
          borderRadius: 5,
          padding: 12,
          width: '80%',
          marginTop: 15,
          paddingLeft: 68,
        }}
      >
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' }}
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <Text style={{ fontSize: 16, color: 'black' }}>Continue with Google</Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgb(248, 248, 248)',
          borderRadius: 5,
          padding: 12,
          width: '80%',
          marginTop: 15,
          paddingLeft: 68,
        }}
      >
        <Icon name="twitter" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'black' }}>Continue with Twitter</Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgb(248, 248, 248)',
          borderRadius: 5,
          padding: 12,
          width: '80%',
          marginTop: 15,
          paddingLeft: 68,
        }}
      >
        <Icon name="facebook" size={24} color="#3b5998" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'black' }}>Continue with Facebook</Text>
      </Pressable>
    </View>
  );
}
