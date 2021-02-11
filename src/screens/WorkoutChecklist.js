import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import ExerciseItem from '../components/ExerciseItem';


const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    background-color: #000;
`;
const SafeArea = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    align-items: center;
    background-color: rgba(1, 59, 14, 0.9);
`;

const WorkoutHeader = styled.View`
    flex-direction: row;
    width: 90%;
    height: 70px;
    align-items: center;
`;
const WorkoutTitle = styled.Text`
    flex: 1;
    color: #FFF;
    font-size: 20px;
`;
const WorkoutClose = styled.TouchableHighlight`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;
const WorkoutCloseText = styled.Text`
    font-size: 22px;
    color: #FFF;
    font-weight: bold;
`;
const WorkoutList = styled.FlatList`
    width: 90%;
    flex: 1;
`;


const Page = (props) => {
    let workout = props.navigation.state.params.workout;
    
    const [ exercises, setExercises ] = useState([...workout.exercises]);

    return (
        
        <Container source={require('../assets/fitness.jpg')}>
            <StatusBar barStyle="light-content" />

            <SafeArea>
                <WorkoutHeader>
                    <WorkoutTitle>{workout.name}</WorkoutTitle>
                    <WorkoutClose
                        onPress={()=>props.navigation.goBack()}
                        underlayColor="transparent"
                    >
                        <WorkoutCloseText>X</WorkoutCloseText>
                    </WorkoutClose>
                </WorkoutHeader>
                <WorkoutList
                    data={exercises}
                    renderItem={({item})=>
                        <ExerciseItem
                            data={item}
                        />
                    }
                    keyExtractor={item=>item.id.toString()}
                />
            </SafeArea>

        </Container>
        
    );
}

Page.navigationOptions = ({navigation}) => {


    return {
        headerShown: false
    }
}
// Função para pegar os dados
const mapStateToProps = (state) => {
    return {
        lastWorkout:state.userReducer.lastWorkout,
        myWorkouts:state.userReducer.myWorkouts
    }
}
// Função para alterar os dados
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);