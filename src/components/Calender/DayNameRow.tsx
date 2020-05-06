import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateTile } from './DateTile';
import { days } from '../../models';
import { TitleText } from '../../utils';

export const DayNameRow = () => {
	const dayNameArray = new Array(7);
	for (let i = 0; i < dayNameArray.length; i++) {
		dayNameArray[i] = (
			<DateTile
				key={i}
				title={days[i]}
				style={styles.dayTilesStyle}
				textComponent={TitleText}
				textStyle={styles.dayText}
			/>
		);
	}
	return <View style={styles.dayNamesContainer}>{dayNameArray}</View>;
};

const styles = StyleSheet.create({
	dayNamesContainer: {
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
	},
	dayTilesStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
	},
	dayText: {
		fontFamily: 'Roboto-Bold',
		color: '#6971E2',
	},
});
