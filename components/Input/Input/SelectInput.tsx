import { useInput } from '@/hooks/useInput';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
interface SelectInputProps {
  title: string;
  control?: any;
  name: string;
  items: { label: string; value: string }[];
  errors?: any;
  placeholder: string;
}
const SelectInput = ({ title, control, name, items, errors, placeholder }: SelectInputProps) => {
  const { openSelect, setOpenSelect } = useInput();
  console.log('SelectInput::');
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <DropDownPicker
              open={openSelect}
              value={value}
              setOpen={setOpenSelect}
              items={items}
              setValue={(callback) => {
                const selectedValue = callback(value);
                onChange(selectedValue);
              }}
              style={[styles.input, errors.gender && { borderColor: 'red', borderWidth: 1 }]}
              placeholder={placeholder}
              containerStyle={{ height: 50, marginBottom: 10 }}
              placeholderStyle={{ color: '#aaa' }}
            />
            {errors.gender && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.gender.message}</Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default memo(SelectInput);

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
  },
});
