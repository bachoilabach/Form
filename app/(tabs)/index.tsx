import ModalSuccess from '@/components/Survey/ModalSuccess';
import SurveyItem from '@/components/Survey/SurveyItem';
import { useSurvey } from '@/hooks/useSurvey';
import { useSurveyForm } from '@/hooks/useSurveyForm';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isModalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const handleShowModalSuccess = () => {
    setModalSuccessOpen(true);
  };
  const handleCloseModal = () => {
    setModalSuccessOpen(false);
  };
  const form = useSurveyForm({ handleShowModalSuccess });
  const { loading, surveys, isRefreshing, pullToRefresh } = useSurvey();
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          style={[styles.container, Platform.OS === 'android' ? { marginTop: 36 } : '']}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(modals)/survey-form')}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Open survey form</Text>
          </TouchableOpacity>
          <Button title={'Open modal'} onPress={handleShowModalSuccess} />
          {loading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <FlatList
              data={surveys}
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
              renderItem={({ item }) => <SurveyItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={
                <View>{surveys?.length === 0 && <Text>Không có survey nào</Text>}</View>
              }
            />
          )}
          {isModalSuccessOpen && (
            <ModalSuccess isModalOpen={isModalSuccessOpen} handleCloseModal={handleCloseModal} />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#33CCFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
