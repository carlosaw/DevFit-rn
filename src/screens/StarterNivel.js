import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

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
const LevelArea = styled.View`
    width: 100%;
`;
const BoldText = styled.Text`
    font-weight: bold;
`;

const Page = (props) => {

    let funnyPhrase = '';
    switch(props.workoutDays.length) {
        case 1:
            funnyPhrase = 'Só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:
            funnyPhrase = '2 dias eu acho pouco, mas quem sou eu pra te julgar?';
            break;
        case 3:
            funnyPhrase = 'Legal 3 dias dá pro gasto...';
            break;
        case 4:
            funnyPhrase = 'Legal 4 dias vai ser top!';
            break;
        case 5:
            funnyPhrase = 'É isso aí, 5 dias é o mínimo, lets GO!';
            break;
        case 6:
            funnyPhrase = 'É, 6 dias não é pra todo mundo...';
            break;
        case 7:
            funnyPhrase = 'Wooow! Todo dia?! WTF';
            break;
    }

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Container>
                <HeaderText>{funnyPhrase}</HeaderText>
                <HeaderText><BoldText>Qual seu nível hoje?</BoldText></HeaderText>

                <LevelArea>
                    <DefaultButton style={{marginBottom:20}}
                        bgcolor={props.level=='beginner'?'#A5E8BC':false}
                        onPress={()=>setMyLevel('beginner')}
                        underlayColor="#DDD">
                        <Text>Iniciante / Um frango</Text>
                    </DefaultButton>
                    <DefaultButton style={{marginBottom:20}}
                        bgcolor={props.level=='intermediate'?'#A5E8BC':false}
                        onPress={()=>setMyLevel('intermediate')}
                        underlayColor="#DDD">
                        <Text>Intermediário / Me viro bem</Text>
                    </DefaultButton>
                    <DefaultButton style={{marginBottom:20}}
                        bgcolor={props.level=='advanced'?'#A5E8BC':false}
                        onPress={()=>setMyLevel('advanced')}
                        underlayColor="#DDD">
                        <Text>Avançado / Primo do The Rock</Text>
                    </DefaultButton>
                </LevelArea>
            </Container>
        </SafeAreaView>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.level) {
            alert('Você precisa escolher uma opção!');
            return
        }
        navigation.navigate('StarterRecommendations');
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
        level:state.userReducer.level,
        workoutDays:state.userReducer.workoutDays
    }
}
// Função para alterar o nome
const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=>dispatch({type:"SET_LEVEL", payload:{level}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);