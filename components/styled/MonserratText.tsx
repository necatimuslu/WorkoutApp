import { Text } from "react-native";

export function MonserratText(props: Text["props"]) {
  return (
    <Text style={[props.style, { fontFamily: "montserrat" }]} {...props} />
  );
}
