import { Text, TextInput, View, Image } from "react-native";
import { useState } from "react";
import Icon from '@expo/vector-icons/FontAwesome';
import ButtonReusable from "../components/Button";
import TextInputReusable from "../components/TextInput"

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
          fontWeight: 400,
          marginBottom: 5
        }}>
          Username
        </Text>
        <TextInputReusable
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          iconName="user"
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 17,
            fontWeight: 400,
            marginTop: 20,
            marginBottom: 5
          }}>
          Email or Phone number
        </Text>
        <TextInputReusable
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          placeholder="Enter your email or number"
          iconName="envelope"
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 17,
            fontWeight: 400,
            marginTop: 20,
            marginBottom: 5
          }}>
          Password
        </Text>
        <TextInputReusable
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          iconName="lock"
          secureTextEntry={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </View>
      <ButtonReusable
        paddingVert={15}
        alignItems="center"
        justifyContent="center"
        backgroundColor="rgb(74, 171, 248)"
        borderRadius={10}
        width="80%"
        marginTop={20}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Create Account</Text>
      </ButtonReusable>
      <Text
        style={{
          marginTop: 20,
          fontSize: 14,
        }}
      >
        or use social account
      </Text>

      <ButtonReusable
        alignItems="center"
        backgroundColor="rgb(248, 248, 248)"
        borderRadius={5}
        width="80%"
        marginTop={15}
        padLeft={68}
        flexDir="row"
        fullPadding={12}>

          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' }}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: 'black' }}>Continue with Google</Text>

      </ButtonReusable>

      <ButtonReusable
        alignItems="center"
        backgroundColor="rgb(248, 248, 248)"
        borderRadius={5}
        width="80%"
        marginTop={15}
        padLeft={68}
        flexDir="row"
        fullPadding={12}>
        
          <Icon name="twitter" size={24} color="black" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, color: 'black' }}>Continue with Twitter</Text>
      </ButtonReusable>

      <ButtonReusable
        alignItems="center"
        backgroundColor="rgb(248, 248, 248)"
        borderRadius={5}
        width="80%"
        marginTop={15}
        padLeft={68}
        flexDir="row"
        fullPadding={12}>
        <Icon name="facebook" size={24} color="#3b5998" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'black' }}>Continue with Facebook</Text>
      </ButtonReusable>
    </View>
  );
}
