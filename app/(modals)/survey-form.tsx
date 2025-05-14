import CustomFormInput from '@/components/Input/CustomFormInput';
import DateInput, { Mode } from '@/components/Input/DateInput';
import SelectInput from '@/components/Input/SelectInput';
import ModalSuccess from '@/components/Survey/ModalSuccess';
import { fullNameVietNamese, number } from '@/constants/Regex';
import { behavior, KEY_BOARD_OFFSET } from '@/constants/Survey';
import { KeyboardType } from '@/enums/KeyboardType';
import { useSurveyForm } from '@/hooks/useSurveyForm';
import React, { memo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const SurveyForm = () => {
  const { control, errors, onSubmit, genderItems } = useSurveyForm();
  return (
    <>
      <ModalSuccess />
      <KeyboardAvoidingView
        behavior={behavior}
        style={{ flex: 1 }}
        keyboardVerticalOffset={KEY_BOARD_OFFSET}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <CustomFormInput
              control={control}
              title={'Full Name'}
              name={'fullName'}
              requiredMessage={'Full Name is required'}
              regex={fullNameVietNamese}
              patternMessage="Full name must contain only letters (including Vietnamese characters) and spaces."
              placeholder="Enter your full name"
            />
            <SelectInput
              control={control}
              errors={errors}
              title="Gender"
              name="gender"
              placeholder="Select gender"
              items={genderItems}
            />

            <CustomFormInput
              control={control}
              title="Age"
              name="age"
              requiredMessage="Age is required"
              regex={number}
              patternMessage="Age is not contain character"
              minValue={10}
              maxValue={100}
              keyboardType={KeyboardType.NUMPAD}
              placeholder="Enter your age"
            />
            <DateInput
              control={control}
              title="Date of Birth"
              name="dateOfBirth"
              minimumDate={new Date(1950, 0, 1)}
              maximumDate={new Date()}
              mode={Mode.DATE}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={{ color: '#fff' }}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default memo(SurveyForm);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
