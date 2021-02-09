import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FFF;
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;   
`;
const HeaderText = styled.Text`
    font-size: 14px;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
`;

const NextButton = styled.Button``;
const BoldText = styled.Text`
    font-weight: bold;
`;
const DaysArea = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Page = (props) => {

    const toggleDay = (d) => {
        // Clone para manipular
        let newWorkoutDays = [...props.workoutDays];

        // Adiciona 
        if(!props.workoutDays.includes(d)) {
            // inserir            
            newWorkoutDays.push(d);
        } else {
            // remover
            newWorkoutDays = newWorkoutDays.filter(i => i != d);
        }
        props.setWorkoutDays(newWorkoutDays);
        props.navigation.setParams({workoutDays:newWorkoutDays});
    }

    let firstName = props.name.split(' ')[0];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Container>            
                <HeaderText>Opa, <BoldText>{firstName}</BoldText>, tudo bem?</HeaderText>
                <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende treinar?</HeaderText>

                <DaysArea>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(1)?'#A5E8BC':false}
                        onPress={()=>toggleDay(1)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Segunda</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(2)?'#A5E8BC':false}
                        onPress={()=>toggleDay(2)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Terça</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(3)?'#A5E8BC':false}
                        onPress={()=>toggleDay(3)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Quarta</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(4)?'#A5E8BC':false}
                        onPress={()=>toggleDay(4)}  
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Quinta</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(5)?'#A5E8BC':false}
                        onPress={()=>toggleDay(5)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Sexta</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(6)?'#A5E8BC':false}
                        onPress={()=>toggleDay(6)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Sábado</Text>
                    </DefaultButton>
                    <DefaultButton
                        style={{marginBottom:20, width:100}}
                        bgcolor={props.workoutDays.includes(0)?'#A5E8BC':false}
                        onPress={()=>toggleDay(0)}
                        underlayColor="#DDD"
                    >
                        <Text style={{fontSize:10}}>Domingo</Text>
                    </DefaultButton>
                </DaysArea>            
            </Container>
        </SafeAreaView>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.workoutDays.length) {
            alert('Você precisa treinar pelo menos 1 dia!');
            return
        }
        navigation.navigate('StarterNivel');
    }

    return {
        title:'',
        headerRight:()=> <NextButton title="Próximo" onPress={nextAction} />,
        headerRightContainerStyle:{
            marginRight: 15
        }
    }
}
// Função para pegar o nome
const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name,
        workoutDays:state.userReducer.workoutDays
    }
}
// Função para alterar o nome
const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:"SET_WORKOUTDAYS", payload:{workoutDays}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);