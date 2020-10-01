import { SelectItem, Text } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export const populateCandidates = (swapCandidates) => {
    const tempC = swapCandidates.map((candidate, index) => {
        return (
            <SelectItem
                key={`${index}-${candidate.email}`}
                title={`${candidate.firstName} ${candidate.lastName}`}
            />
        );
    });
    // tempC.unshift(
    //     <SelectItem key={'Unselected placeholder candidates'} title={'Name'} />,
    // );
    return tempC;
};

export const populateTimes = (times) => {
    const tempT = times.map((item, index) => <SelectItem key={index} title={item} />);
    // tempT.unshift(<SelectItem key={'Unselected placeholder times'} title={'Time'} />);
    return tempT;
};

// export const renderTaskList = ({ item, index }) => {
//     return (
//         <TouchableOpacity
//             style={styles.listItem}
//             onPress={() => onItemSelect(item, index)}
//         >
//             <Text>{item.role.name}</Text>
//             <Text>{item.date}</Text>
//             <Text>
//                 {item.user.firstName} {item.user.lastName}
//             </Text>
//         </TouchableOpacity>
//     );
// };
