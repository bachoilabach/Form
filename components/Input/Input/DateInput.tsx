
import { useInput } from "@/hooks/useInput";
import React from "react";
import { useController } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export enum Mode {
  DATE = "date",
  TIME = "time",
  DATET_TIME = "datetime",
}

interface DateInputProps {
  title: string;
  control: any;
  name: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: Mode;
}

const DateInput = ({
  title,
  control,
  name,
  minimumDate,
  maximumDate,
  mode = Mode.DATE,
}: DateInputProps) => {
  const { field } = useController({ control, name });
  const { setDatePickerVisibility, isDatePickerVisible, formatDate } =
    useInput();

  console.log("DateInput::"); 

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text>{field.value ? formatDate(field.value, mode) : "Select date"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        display="spinner"
        date={field.value || new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onConfirm={(selectedDate) => {
          setDatePickerVisibility(false);
          field.onChange(selectedDate);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
};

export default React.memo(DateInput); 

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "600",
  },
});
