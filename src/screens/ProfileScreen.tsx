import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import profile from '../dummyData';

export const ProfileScreen = (props) => {
	const { email, firstName, lastName } = profile;

	return (
		<View style={styles.screen}>
			<Text>This is the profile screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
