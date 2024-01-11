import React from 'react';
import { Row, Text } from 'native-base';
import { screenWidth } from '../../styles/constants';

export default function TabHeader({title}) {
    return (
        <Row width={screenWidth - 30} alignItems='center' justifyContent='center'>
            <Text fontSize={20} fontWeight='normal' color='white'>{title}</Text>
        </Row>
    );
}


