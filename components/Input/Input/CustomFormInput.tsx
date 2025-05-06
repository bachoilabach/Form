import { KeyboardType } from '@/enums/KeyboardType';
import React from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput } from 'react-native';

interface CustomFormInputProps {
  title: string;
  control: any;
  name: string;
  requiredMessage?: string;
  regex?: RegExp;
  patternMessage?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
}

const CustomFormInput = ({
  title,
  control,
  name,
  requiredMessage,
  regex,
  patternMessage,
  placeholder,
  keyboardType,
  multiline = false,
  minValue,
  maxValue,
  maxLength,
}: CustomFormInputProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...(requiredMessage && { required: requiredMessage }),
      ...(regex &&
        patternMessage && {
          pattern: {
            value: regex,
            message: patternMessage,
          },
        }),
      ...(minValue !== undefined && {
        min: {
          value: minValue,
          message: `${title} must be at least ${minValue}`,
        },
      }),
      ...(maxValue !== undefined && {
        max: {
          value: maxValue,
          message: `${title} must be at most ${maxValue}`,
        },
      }),
    },
  });
  console.log('CUSTOM INPUT::');
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.input, error && { borderColor: 'red' }, multiline && { height: 100 }]}
        placeholder={placeholder || `Enter your ${title.toLowerCase()}`}
        value={value}
        onChangeText={(text) => {
          const parsedValue = keyboardType === KeyboardType.NUMPAD ? Number(text) : text;
          onChange(parsedValue);
        }}
        keyboardType={keyboardType}
        multiline={multiline}
        maxLength={maxLength}
      />
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </>
  );
};

export default React.memo(CustomFormInput);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
});
