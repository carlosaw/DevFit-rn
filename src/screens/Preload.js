import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => {
    if(!props.name) {
        // Mandar para StaterStack e resetar histórico
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions: [
                NavigationActions.navigate({routeName:'StarterStack'})
            ]
        }));
    } else {
        // Mandar para AppTab
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions: [
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }));
    }
    
    return null;
}

const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name
    };
}

export default connect(mapStateToProps)(Preload);