import React, { useState } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Container = styled.SafeAreaView`
    flex: 1;
    margin: 0 30px;
`;
const Label = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
`;
const Input = styled.TextInput`
    border: 1px solid #CCC;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
`;
const ListArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const DayItem = styled.TouchableHighlight`
    width: 40px;
    height: 40px;
    border: 1px solid #CCC;
    border-radius: 10px;
    background-color: #EEE;
    justify-content: center;
    align-items: center;
`;
const DayItemText = styled.Text`
    font-size: 12px;
`;

const LevelItem = styled.TouchableHighlight`
    padding: 0px 5px;
    background-color: #EEE;
    height: 40px;
    border: 1px solid #CCC;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;
const LevelItemText = styled.Text`
    font-size: 12px;
`;
const ResetButton = styled.Button``;

const Page = (props) => {

    const toggleWorkoutDay = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if(newWorkoutDays.includes(d)) {
            if(newWorkoutDays.length == 1) {
                alert('Calma ae! Você tem que treinar pelo menos 1 dia');
                return;               
            }
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
        } else {
            newWorkoutDays.push(d);
        }

        props.setWorkoutDays(newWorkoutDays);
    }

    const resetAction = () => {
        props.reset();
        const resetAction = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'StarterStack'})
            ]
        });
        props.navigation.dispatch(resetAction);

    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Container>
                <Label>Seu nome Completo:</Label>
                <Input value={props.name} onChangeText={e=>props.setName(e)} />

                <Label>Dias em que você treina:</Label>
                <ListArea>
                    <DayItem onPress={()=>toggleWorkoutDay(1)} underlayColor="transparent" style={props.workoutDays.includes(1)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>S</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(2)} underlayColor="transparent" style={props.workoutDays.includes(2)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>T</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(3)} underlayColor="transparent" style={props.workoutDays.includes(3)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>Q</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(4)} underlayColor="transparent" style={props.workoutDays.includes(4)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>Q</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(5)} underlayColor="transparent" style={props.workoutDays.includes(5)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>S</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(6)} underlayColor="transparent" style={props.workoutDays.includes(6)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>S</DayItemText>
                    </DayItem>
                    <DayItem onPress={()=>toggleWorkoutDay(0)} underlayColor="transparent" style={props.workoutDays.includes(0)?{backgroundColor:'#A5E8BC'}:{}}>
                        <DayItemText>D</DayItemText>
                    </DayItem>
                </ListArea>

                <Label>Seu nível:</Label>
                <ListArea>
                    <LevelItem onPress={()=>props.setLevel('beginner')} underlayColor="transparent" style={props.level=='beginner'?{backgroundColor:'#A5E8BC'}:{}}>
                        <LevelItemText>Iniciante</LevelItemText>
                    </LevelItem>
                    <LevelItem onPress={()=>props.setLevel('intermediate')} underlayColor="transparent" style={props.level=='intermediate'?{backgroundColor:'#A5E8BC'}:{}}>
                        <LevelItemText>Intermediário</LevelItemText>
                    </LevelItem>
                    <LevelItem onPress={()=>props.setLevel('advanced')} underlayColor="transparent" style={props.level=='advanced'?{backgroundColor:'#A5E8BC'}:{}}>
                        <LevelItemText>Avançado</LevelItemText>
                    </LevelItem>
                </ListArea>

                <Label>Você quer resetar tudo?</Label>
                <ResetButton title="Resetar Tudo" onPress={resetAction} />
            </Container>
        </SafeAreaView>
    );
}

Page.navigationOptions = ({navigation}) => {

    return {
        title:'Configurações'
    }
}
// Função para pegar os dados
const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name,
        workoutDays:state.userReducer.workoutDays,
        level:state.userReducer.level
    }
}
// Função para alterar os dados
const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}}),
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}}),
        reset:()=>dispatch({type:'RESET'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);