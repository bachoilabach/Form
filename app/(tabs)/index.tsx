import SurveyItem from '@/components/Survey/SurveyItem';
import { Colors } from '@/constants/Colors';
import { useSurvey } from '@/hooks/useSurvey';
import { router } from 'expo-router';
import {
  ActivityIndicator,
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
  const { loading, surveys, isRefreshing, pullToRefresh } = useSurvey();
  const padding = Platform.OS === 'android' ? { marginTop: 36 } : '';
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, padding]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(modals)/survey-form')}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Open survey form</Text>
          </TouchableOpacity>
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    zIndex: 0,
  },
  button: {
    backgroundColor: Colors.light.button,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
