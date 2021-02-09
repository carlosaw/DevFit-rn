import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FFF;
`;
const HeaderText = styled.Text`
    font-size: 14px;
    color: #333;
    margin-top: 50px;
    margin-bottom: 50px;
`;
const NameInput = styled.TextInput`
    border: 1px solid #CCC;
    width: 80%;
    height: 50px;
    border-radius: 10px;
    font-size: 15px;
    padding: 10px;
    background-color: #FFF;
`;
const NextButton = styled.Button``;

const Page = (props) => {

    const nextAction = () => {
        if(!props.name) {
            alert("Você precisa de um nome!");
            return
        }

        props.navigation.navigate('StarterDias');
    }

    const handleChangeName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }

    return (
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={handleChangeName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.name) {
            alert("Você precisa de um nome!");
            return
        }
        navigation.navigate('StarterDias');
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
        name:state.userReducer.name
    }
}
// Função para alterar o nome
const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);