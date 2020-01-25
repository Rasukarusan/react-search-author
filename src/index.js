import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components'

const SEARCH_BUTTON_TEXT_DEFAULT = '検索';
const SEARCH_BUTTON_TEXT_RUNNING = '検索中...';
const MESSAGE_NOT_FOUND = '取得できませんでした';

const Container = styled.div`
    text-align: center;
    background: #4e54c8;
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
    width: 100vw;
    height:120vh;
`;

const Hr = styled.hr`
    height: 20px;
    border-style: solid;
    border-color: gray;
    border-width: 1px 0 0 0;
    border-radius: 200px;

    &::before {
        display: block;
        content: "";
        height: 20px;
        margin-top: -20px;
        border-style: gray;
        border-color: black;
        border-width: 0 0 1px 0;
        border-radius: 100px;
    }
`;

const Title = styled.h1`
    font-size: 2.5em;
    text-align: center;
    color: palevioletred;
`;

const Textarea = styled.textarea`
    font-size: 1em;
    border: 1px solid gray;
    border-radius: 3px;
    width: 50vw;
    height: 30vh;
    max-width: 80vw;
`;

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    font-size: 1.5em;

    ${props => props.primary && css`
      background: palevioletred;
      color: white;
    `}
`;

const circleAnimate = keyframes`
    from {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }
    to {
        transform: translateY(-1500px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
`;

const Circle = styled.li`
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: ${circleAnimate} 25s linear infinite;
    bottom: -150px;

    &:nth-child(1){
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
    }

    &:nth-child(2){
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
    }

    &:nth-child(3){
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
    }

    &:nth-child(4){
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
    }

    &:nth-child(5){
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
    }

    &:nth-child(6){
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
    }

    &:nth-child(7){
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
    }

    &:nth-child(8){
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
    }

    &:nth-child(9){
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
    }

    &:nth-child(10){
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
    }
`;


function jsonToResult(json) {
    let item = json.items[0];
    let author = item.volumeInfo.authors ? item.volumeInfo.authors.pop() : MESSAGE_NOT_FOUND;
    let category = item.volumeInfo.categories ? item.volumeInfo.categories.pop() : MESSAGE_NOT_FOUND;
    return '\t' + author + '\t' + category + '\n';
}

function Circles() {
    const circles = [...Array(10)].map((_,i) => <Circle key={i}></Circle>);
    return(
        <ul>
            {circles}
        </ul>
    );

}

class Search extends React.Component {
    render() {
        return (
            <div>
                <Title>著者検索</Title>
                <Textarea
                    value={this.props.inputText}
                    onChange={this.props.onChange(this)}>
                </Textarea>
                <br />
                <Button primary onClick={this.props.onClick(this)} disabled={this.props.searchButtonDisabled}>
                    {this.props.searchButtonText}
                </Button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '実験思考\n結局人生はアウトプットで決まる',
            searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
            searchButtonDisabled : false,
            result: '',
        };
    }

    onChangeInputArea(e) {
        let inputText = e.target.value;
        this.setState({
            inputText: inputText,
            searchButtonDisabled: inputText === '' ? true : false,
        });
    }

    handleClick(e) {
        this.setState({
            searchButtonText: SEARCH_BUTTON_TEXT_RUNNING,
            searchButtonDisabled: !e.target.disabled,
            result: '',
        });
        // 改行区切りで配列化し、空文字要素を削除
        let titles = this.state.inputText.split('\n').filter(v => v);
        titles.forEach(title => this.search(title));
        e.preventDefault();
    }

    search(title) {
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + title)
        .then(res => res.json())
        .then(
            (json) => {
                if(!json.items) {
                    this.setState({
                        searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
                        searchButtonDisabled: false,
                        result: title + '\t' + MESSAGE_NOT_FOUND + '\t' + MESSAGE_NOT_FOUND + '\n',
                    });
                    return;
                }
                let result = title + jsonToResult(json);
                this.setState({
                    searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
                    searchButtonDisabled: false,
                    result: this.state.result + result,
                });
            },
            (error) => {
                this.setState({
                    searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
                    searchButtonDisabled: false,
                    result: 'リクエストに失敗しました',
                });
            }
        )
    }

    render() {
        return (
            <Container>
                <Search
                    inputText={this.state.inputText}
                    onChange={() => this.onChangeInputArea.bind(this)}
                    searchButtonText={this.state.searchButtonText}
                    searchButtonDisabled={this.state.searchButtonDisabled}
                    onClick={() => this.handleClick.bind(this)}
                />
                <Circles />
                <Hr />
                <Result result={this.state.result}/>
            </Container>
        );
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    onClick() {
        this.textArea.current.select();
        document.execCommand('copy');
        this.textArea.current.focus();
    }

    render() {
        return (
            <div>
                <Title>結果</Title>
                <Textarea
                    defaultValue={this.props.result}
                    ref={this.textArea}
                    cols="100" rows="15">
                </Textarea>
                <br />
                <Button onClick={this.onClick.bind(this)}>結果をコピー</Button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
