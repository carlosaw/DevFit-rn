import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import workoutJson from '../presetWorkouts.json';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FFF;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;    
`;
const HeaderText = styled.Text`
    font-size: 14px;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
`;

const NextButton = styled.Button``;

const WorkoutList = styled.FlatList`
    width: 100%;
`;

const Page = (props) => {

    useEffect(()=>{
        props.navigation.setParams({myWorkouts:props.myWorkouts});
    }, [props.myWorkouts]);

    const addWorkout = (item) => {
        if(props.myWorkouts.findIndex(i=>i.id==item.id) < 0) {
            props.addWorkout(item);
        } else {
            props.delWorkout(item);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Container>
                <HeaderText>Opções de treinos pré-criados com base no seu nível</HeaderText>
                <HeaderText>Você selecionou {props.myWorkouts.length} treinos</HeaderText>

                <WorkoutList
                    data={workoutJson}
                    renderItem={({item})=><Workout
                        data={item}
                        addAction={()=>addWorkout(item)}
                    />}
                    keyExtractor={item=>item.id}
                />
            </Container>
        </SafeAreaView>
    );
}

Page.navigationOptions = ({navigation}) => {

    let btnNext = 'Ignorar';
    if(navigation.state.params && navigation.state.params.myWorkouts.length > 0) {
        btnNext = 'Concluir';
    }

    const nextAction = () => {
        navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }));
    }

    return {
        title:'',
        headerRight:()=><NextButton title={btnNext} onPress={nextAction} />,
        headerRightContainerStyle:{
            marginRight: 15
        }
    }
}
// Função para pegar o nome
const mapStateToProps = (state) => {
    return {
        myWorkouts:state.userReducer.myWorkouts
    }
}
// Função para alterar o nome
const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>dispatch({type:'ADD_WORKOUT', payload:{workout}}),
        delWorkout:(workout)=>dispatch({type:'DEL_WORKOUT', payload:{workout}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);