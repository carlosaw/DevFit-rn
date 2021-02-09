import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const TabBarArea = styled.SafeAreaView`
    flex-direction: row;
    background-color: #DDD;
`;
const TabBarItem = styled.View`
    flex: 1;
    height: 85px;
    align-items: center;
`;
const TabRegular = styled.TouchableHighlight`
    align-items: center;
    font-size: 8px;
`;
const TabImage = styled.Image`
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-bottom: 5px;
`;
const TabBall = styled.TouchableHighlight`
    width: 80px;
    height: 80px;
    background-color: #3BA237;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    border: 5px solid #FFF;
    margin-top: -50px;
`;
const TabBallImage = styled.Image`
   width: 40px;
   height: 40px; 
`;
const TabText = styled.Text`
    font-size: 12px;
`;

export default (props) => {
    return (
        <TabBarArea>
            {props.items.map(item=>(
                <TabBarItem key={item.route}>
                    {item.type == 'regular' &&
                        <TabRegular underlayColor="transparent" onPress={()=>props.navigation.navigate(item.route)}>
                            <>
                                <TabImage source={item.icon} />
                                <TabText>{item.text}</TabText>
                            </>
                        </TabRegular>
                    }
                    {item.type == 'big' &&
                        <TabBall underlayColor="#00FF00" onPress={()=>props.navigation.navigate(item.route)}>
                            <TabBallImage source={item.icon} />
                        </TabBall>
                    }
                </TabBarItem>
            ))}
        </TabBarArea>
    );
}