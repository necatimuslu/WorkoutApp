import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { View, FlatList, StyleSheet, Pressable, Text } from "react-native";
import { MonserratText } from "../components/styled/MonserratText";
import WorkoutItem from "../components/WorkoutItem";

import { useWorkouts } from "../hooks/useWorkouts";
import { formatSec } from "../utils/time";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
  const workouts = useWorkouts();

  return (
    <View style={styles.container}>
      <MonserratText style={styles.header}>Yeni Çalışmalar</MonserratText>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate("WorkDetail", { item: item })}
            >
              {/* <WorkoutItem item={item} /> */}
              <View style={styles.container2}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.duration}>
                  Antreman Süresi: {formatSec(item?.duration)}
                </Text>

                <Text style={styles.difficulty}>
                  Antreman zorluğu: {item?.difficulty}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container2: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  duration: {
    fontSize: 15,
    marginBottom: 3,
  },
  difficulty: {
    fontSize: 15,
  },
  childrenView: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
});
