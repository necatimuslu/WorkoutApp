import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { CostumModal } from "../components/styled/CustomModal";
import { useWorkout } from "../hooks/useWorkout";
import { PressableText } from "../components/styled/PressableText";
import WorkoutItem from "../components/WorkoutItem";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Sequence } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      item: {
        slug: string;
      };
    };
  };
};
type Navigation = NativeStackHeaderProps & DetailParams;
export default function WorkoutDetail({ route }: Navigation) {
  const workout = useWorkout(route.params.item.slug);
  const [sequence, setSequence] = useState<Sequence[]>([]);

  const [traxId, setTraxId] = useState(-1);

  const { countDown, isRunning, stop, start } = useCountDown(traxId);

  const startupSeq = ["3", "2", "1", "Başla"].reverse();

  useEffect(() => {
    if (!workout) {
      return;
    }

    if (traxId === workout!.sequence.length - 1) {
      return;
    }
    if (countDown == 0) {
      addItemSequence(traxId + 1);
    }
  }, [countDown]);

  const addItemSequence = (id: number) => {
    let newSequence = [];
    if (id > 0) {
      newSequence = [...sequence, workout!.sequence[id]];
    } else {
      newSequence = [workout!.sequence[id]];
    }

    setSequence(newSequence);
    setTraxId(id);
    start(newSequence[id].duration + startupSeq.length);
  };
  const hasReachedEnd =
    sequence.length === workout?.sequence.length && countDown === 0;
  return (
    <View style={styles.container}>
      <WorkoutItem item={workout!}>
        <CostumModal
          workout={workout}
          activator={({ handleOpen }: any) => (
            <PressableText text="Antreman Detay" onPress={handleOpen} />
          )}
        />
      </WorkoutItem>
      <View style={styles.wrapper}>
        <View style={styles.centerView}>
          <View style={styles.counterItem}>
            {sequence.length === 0 ? (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => addItemSequence(0)}
              />
            ) : isRunning ? (
              <FontAwesome
                name="stop-circle-o"
                size={100}
                onPress={() => stop()}
              />
            ) : (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>
          {sequence.length > 0 && countDown >= 0 && (
            <View style={styles.counterItem}>
              <Text style={styles.countDownText}>
                {countDown > sequence[traxId].duration
                  ? startupSeq[countDown - sequence[traxId].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {sequence.length === 0
              ? "Hazırlan"
              : hasReachedEnd
              ? "Güzel iş"
              : sequence[traxId].name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: "center",
  },
  countDownText: {
    fontSize: 60,
  },
  counterItem: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
