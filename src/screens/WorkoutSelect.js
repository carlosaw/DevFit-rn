import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Workout from '../components/Workout';
import { StackActions, NavigationActions } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';

const Container = styled.SafeAreaView`
    flex: 1;
`;
const WorkoutList = styled.FlatList`
    flex: 1;
    padding: 20px;
`;
const Title = styled.Text`
    text-align: center;
    margin-top: 30px;
`;

const Page = (props) => {

    let lastWorkout = false;
    if(props.lastWorkout) {
        lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout);
    }

    const goWorkout = (workout) => {
        props.navigation.navigate('WorkoutChecklist', {workout});
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Container>
                {lastWorkout &&
                <>
                    <Title>Seu último treino foi:</Title>
                    <Workout data={lastWorkout} />
                </>
                }
                <Title>Escolha seu treino de hoje:</Title>
                <WorkoutList 
                    data={props.myWorkouts}
                    renderItem={({item})=>
                    <Workout
                        data={item}
                        goAction={()=>goWorkout(item)}
                    />
                    }
                />
            </Container>
        </SafeAreaView>
    );
}

Page.navigationOptions = ({navigation}) => {

    const handleBackAction = () => {
        navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }));
    }

    return {
        title:'Escolha seu treino',
        headerLeft:()=><HeaderBackButton onPress={handleBackAction} />
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