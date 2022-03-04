import { View, Modal, StyleSheet, Text } from "react-native";
import { PressableText } from "./PressableText";
import React, { FunctionComponent, useState } from "react";

import { formatSec } from "../../utils/time";

import { FontAwesome } from "@expo/vector-icons";

type ModalProps = {
  activator?: FunctionComponent<{ handleOpen: () => void }>;
};
export function CostumModal(
  { workout }: any,
  { activator: Activator }: ModalProps
) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal visible={modalVisible}>
        <View style={styles.modelView}>
          <View style={styles.modalViewTextContainer}>
            {workout?.sequence.map((m: any, i: any) => (
              <View key={i}>
                <Text style={styles.textModal}>
                  {m?.name} | {m?.type} | {formatSec(m?.duration)} | {m?.reps}
                </Text>
                {i !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} />
                )}
              </View>
            ))}
          </View>
          <PressableText text="Kapat" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText
          text="Antreman Detay"
          onPress={() => setModalVisible(true)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  modelView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewTextContainer: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
  },
  textModal: {
    fontSize: 15,
    padding: 5,
    elevation: 1,
  },
});
