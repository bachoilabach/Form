import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch, Text, View } from 'react-native';
interface SwitchProps {
  title: string;
  control?: any;
  name: string;
}
const CustomeSwitch = ({ title, control, name }: SwitchProps) => {
  console.log('CustomeSwitch::');
  return (
    <View key={name}>
      <Text style={{ fontWeight: '600', marginBottom: 8 }}>{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />
    </View>
  );
};

export default CustomeSwitch;
