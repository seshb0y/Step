import { StyleSheet } from "react-native";
 
export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5DB075",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  innerContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24,
  },
});