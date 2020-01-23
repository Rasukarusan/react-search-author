import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components'

const SEARCH_BUTTON_TEXT_DEFAULT = '検索';
const SEARCH_BUTTON_TEXT_RUNNING = '検索中...';
const MESSAGE_NOT_FOUND = '取得できませんでした';

const Container = styled.div`
    text-align: center;
`;

const Hr = styled.hr`
    height: 20px;
    border-style: solid;
    border-color: black;
    border-width: 1px 0 0 0;
    border-radius: 200px;

    &::before {
        display: block;
        content: "";
        height: 20px;
        margin-top: -20px;
        border-style: solid;
        border-color: black;
        border-width: 0 0 1px 0;
        border-radius: 100px;
    }
`;

const Title = styled.h1`
    font-size: 5.5em;
    text-align: center;
    color: palevioletred;
`;

const Textarea = styled.textarea`
    font-size: 1em;
    border: 1px solid gray;
    border-radius: 3px;
    width: 1000px;
    height: 400px;
    max-width: 80%;
`;

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    font-size: 30px;

    ${props => props.primary && css`
      background: palevioletred;
      color: white;
    `}
`;

function jsonToResult(json) {
    let item = json.items[0];
    let author = item.volumeInfo.authors ? item.volumeInfo.authors.pop() : MESSAGE_NOT_FOUND;
    let category = item.volumeInfo.categories ? item.volumeInfo.categories.pop() : MESSAGE_NOT_FOUND;
    return '\t' + author + '\t' + category + '\n';
}

class Search extends React.Component {
    render() {
        return (
            <div>
                <Title>著者検索</Title>
                <form>
                    <div>
                        <Textarea
                            value={this.props.inputText}
                            onChange={this.props.onChange(this)}>
                        </Textarea>
                    </div>
                </form>
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
                <form>
                    <div>
                        <Textarea
                            defaultValue={this.props.result}
                            ref={this.textArea}
                            cols="100" rows="15">
                        </Textarea>
                    </div>
                </form>
                <Button onClick={this.onClick.bind(this)}>結果をコピー</Button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
