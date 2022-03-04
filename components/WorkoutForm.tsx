import { useState } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import { Sequence, Workout } from "../types/data";
import slugify from "slugify";
import { formatSec } from "../utils/time";
import { storeData } from "../storage";
import { storeWorkout } from "../storage/workout";

export default function WorkoutForm({ navigation, route }: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [workName, setWorkName] = useState("");
  const [items, setItems] = useState([
    { label: "Exercise", value: "exercise" },
    { label: "Break", value: "break" },
    { label: "Stretch", value: "stretch" },
  ]);
  const { control, handleSubmit } = useForm({});
  const [seqItem, setSeqItem] = useState<Sequence[]>([]);
  const computeDiff = (exerciesCount: number, workoutDuration: number) => {
    const instensity = workoutDuration / exerciesCount;

    if (instensity <= 60) {
      return "hard";
    } else if (instensity <= 100) {
      return "medium";
    } else {
      return "easy";
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={seqItem}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - {item.reps} - {formatSec(item.duration)} |{" "}
              {item.type}
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.buttonStyle}
                onPressIn={() => {
                  const items = [...seqItem];
                  items.splice(index, 1);
                  setSeqItem(items);
                }}
              >
                <Text style={styles.buttonText}>Sil</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.formContainer}>
        <View style={styles.formInputContainer}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Antreman adı "
              />
            )}
          />

          <Controller
            control={control}
            name="duration"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Antreman süresi "
              />
            )}
          />
        </View>
        <View style={styles.formInputContainer}>
          <Controller
            control={control}
            name="type"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropMenu}>
                <DropDownPicker
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={onChange}
                  setItems={setItems}
                  onChangeValue={onChange}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="reps"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Antreman tekrarı "
              />
            )}
          />
        </View>
        <View style={styles.addContainer}>
          <Pressable
            onPress={handleSubmit((data) => {
              const sequencItem: Sequence = {
                slug: slugify(data.name + Date.now(), {
                  replacement: "-",
                  lower: true,
                  trim: true,
                }),
                name: data.name,
                duration: Number(data.duration),
                reps: Number(data.reps),
                type: data.type,
              };
              setSeqItem([...seqItem, sequencItem]);
            })}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Egzersiz ekle
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.addContainer2}>
        <TouchableOpacity>
          <Text
            onPress={() => setModalVisible(true)}
            style={{ textDecorationLine: "underline" }}
          >
            Antreman ekle
          </Text>
        </TouchableOpacity>
        <Modal visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View>
              <TextInput
                value={workName}
                onChangeText={setWorkName}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.1)",
                  padding: 10,
                  borderRadius: 10,
                  margin: 10,
                  width: 240,
                  marginLeft: 40,
                }}
                placeholder="Antreman Adı"
              />
            </View>

            <View style={{ marginLeft: 40, marginTop: 5 }}>
              <Pressable
                onPress={async () => {
                  if (seqItem.length > 0) {
                    const duration = seqItem.reduce((a, b) => {
                      return a + b.duration;
                    }, 0);
                    const workoutData: Workout = {
                      slug: slugify(workName + Date.now(), {
                        replacement: "-",
                        lower: true,
                        trim: true,
                      }),
                      name: workName,
                      difficulty: computeDiff(seqItem.length, duration),
                      sequence: [...seqItem],
                      duration: duration,
                    };
                    await storeWorkout(workoutData);
                  }
                }}
                style={styles.pressabeBtn}
              >
                <Text style={{ color: "#fff" }}>Onayla</Text>
              </Pressable>
            </View>
            <View style={{ marginLeft: 40, marginTop: 25 }}>
              <Pressable
                style={styles.pressabeBtn2}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff" }}>Çıkış</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 3,
  },
  formInputContainer: {
    flexDirection: "row",
    padding: 5,
  },
  input: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  addContainer: {
    marginTop: 10,
    marginLeft: 12,
    marginBottom: 5,
  },
  dropMenu: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "rgba(0,0,0,0.2)",
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 15,
    padding: 5,
  },
  buttonContainer: {
    marginTop: 2,
    marginBottom: 1,
    marginLeft: 2,
  },
  buttonStyle: {
    backgroundColor: "red",
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 2,
  },
  buttonText: {
    color: "#fff",
  },
  addContainer2: {
    marginTop: 10,
    marginLeft: 12,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  pressabeBtn: {
    width: 60,
    height: 30,
    backgroundColor: "green",
    borderRadius: 10,
    alignItems: "center",
    fontSize: 15,
    justifyContent: "center",
  },
  pressabeBtn2: {
    width: 60,
    height: 30,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    fontSize: 15,
    justifyContent: "center",
  },
});
