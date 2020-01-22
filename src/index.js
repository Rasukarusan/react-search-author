import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const SEARCH_BUTTON_TEXT_DEFAULT = '検索';
const SEARCH_BUTTON_TEXT_RUNNING = '検索中...';
const MESSAGE_NOT_FOUND = '取得できませんでした';

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
                <h1>著者検索</h1>
                <form className="uk-grid-small uk-grid">
                    <div className="uk-width-1-2@s">
                        <textarea
                            value={this.props.inputText}
                            onChange={this.props.onChange(this)}
                            className="uk-textarea"
                            cols="10" rows="15">
                        </textarea>
                    </div>
                </form>
                <button onClick={this.props.onClick(this)} disabled={this.props.searchButtonDisabled}>
                    {this.props.searchButtonText}
                </button>
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
            <div>
                <Search
                    inputText={this.state.inputText}
                    onChange={() => this.onChangeInputArea.bind(this)}
                    searchButtonText={this.state.searchButtonText}
                    searchButtonDisabled={this.state.searchButtonDisabled}
                    onClick={() => this.handleClick.bind(this)}
                />
                <hr />
                <Result result={this.state.result}/>
            </div>
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
                <h1>結果</h1>
                <form className="uk-grid-small uk-grid">
                    <div className="uk-width-1-2@s">
                        <textarea
                            defaultValue={this.props.result}
                            ref={this.textArea}
                            className="uk-textarea"
                            cols="10" rows="15">
                        </textarea>
                    </div>
                </form>
                <button onClick={this.onClick.bind(this)}>結果をコピー</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
