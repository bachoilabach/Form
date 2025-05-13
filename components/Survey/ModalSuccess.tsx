import { SuccessIcon } from '@/assets/icons/SvgIcon';
import { Gender } from '@/enums/Gender';
import { useSurveySelector } from '@/stores/surveySelector/surveySelector';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const ModalSuccess = () => {
  const { isSuccessModalOpen, closeSuccessModal, submittedSurvey } = useSurveySelector();
  const navigation = useNavigation();
  const handleCloseModal = () => {
    closeSuccessModal();
    navigation.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isSuccessModalOpen}
      onRequestClose={handleCloseModal}
    >
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
            <SuccessIcon />
            <Text style={styles.title}>Success</Text>
            <Text style={styles.contentText}>Successfully submit the survey</Text>
            <View style={styles.submit}>
              <Text style={[styles.sectionInSubmit, styles.titleSubmit]}>Detail:</Text>
              <Text style={styles.sectionInSubmit}>Name: {submittedSurvey?.fullName}</Text>
              <Text style={styles.sectionInSubmit}>Age: {submittedSurvey?.age}</Text>
              <Text style={styles.sectionInSubmit}>
                Gender: {submittedSurvey?.gender === Gender.MALE ? 'Nam' : 'Nữ'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                closeSuccessModal();
                navigation.goBack();
              }}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    color: '#00ee02',
    fontWeight: 600,
    marginBottom: 8,
  },
  contentText: {
    fontWeight: 500,
    fontSize: 18,
    color: '#898989',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 12,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 600,
  },
  confirmButton: {
    backgroundColor: '#3399ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    borderRadius: 12,
  },
  confirmText: {
    fontWeight: 600,
    color: 'white',
    fontSize: 20,
  },
  submit: {
    alignSelf: 'stretch',
    marginVertical: 4,
  },
  titleSubmit: {
    fontWeight: 500,
  },
  sectionInSubmit: {
    fontSize: 16,
  },
});

export default ModalSuccess;
