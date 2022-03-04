import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutForm from "../components/WorkoutForm";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  /* const handleFormSubmit = (form: AddForm) => {
    console.log(
      `${form.name} - ${form.duration} - ${form.reps} - ${form.type}`
    );
  }; */
  return (
    <View style={styles.container}>
      <WorkoutForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
