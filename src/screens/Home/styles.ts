import styled from 'styled-components/native';
import MaskInput from 'react-native-mask-input';

export const Container = styled.View`
    display: flex;
    flex: 1;
    background-color: #fff;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
`;

export const BoxLogo = styled.View`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 30px;
`;

export const BoxActions = styled.View`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const Input = styled(MaskInput)`
    border: 2px solid #333;
    height: 80px;
    width: 80%;
    border-radius: 10px;
    padding-left: 14px;
    padding-right: 14px;
    color: #111;
    font-size: 34px;
`;

export const Button = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #03a23d;
    height: 60px;
    width: 80%;
    border-radius: 6px;
    margin-top: 10px;
`;

export const ButtonTxt = styled.Text`
    color: #fff;
    font-size: 26px;
`;
