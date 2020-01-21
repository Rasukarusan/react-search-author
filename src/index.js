import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const SEARCH_BUTTON_TEXT_DEFAULT = '検索';
const SEARCH_BUTTON_TEXT_RUNNING = '検索中...';
const MESSAGE_NOT_FOUND = '取得できませんでした';

class InputArea extends React.Component {
    render() {
        return (
            <form className="uk-grid-small uk-grid">
                <div className="uk-width-1-2@s">
                    <textarea
                        value={this.props.value}
                        onChange={this.props.onChange(this)}
                        className="uk-textarea"
                        cols="10" rows="15">
                    </textarea>
                </div>
            </form>
        );
    }
}

class SearchButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick(this)} disabled={this.props.disabled}>
                {this.props.value}
            </button>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <div>
                <h1>著者検索</h1>
                <InputArea 
                    value={this.props.inputText} 
                    onChange={this.props.onChange}
                />
                <SearchButton
                    value={this.props.searchButtonText}
                    disabled={this.props.searchButtonDisabled}
                    onClick={this.props.onClick}
                />
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
        let searchButtonText = e.target.innerHTML === SEARCH_BUTTON_TEXT_DEFAULT ?
            SEARCH_BUTTON_TEXT_RUNNING : SEARCH_BUTTON_TEXT_DEFAULT;
        this.setState({
            searchButtonText: searchButtonText,
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
                        result: '検索結果が0でした',
                    });
                    return;
                }
                let item = json.items[0];
                let author = item.volumeInfo.authors ? item.volumeInfo.authors.pop() : MESSAGE_NOT_FOUND;
                let category = item.volumeInfo.categories ? item.volumeInfo.categories.pop() : MESSAGE_NOT_FOUND;
                let result = title + '\t' + author + '\t' + category + '\n';
                this.setState({
                    searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
                    searchButtonDisabled: false,
                    result: this.state.result + result,
                });
            },
            (error) => {
                this.setState({
                    searchButtonText: SEARCH_BUTTON_TEXT_DEFAULT,
                    searchButtonDisabled: false
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
    render() {
        return (
            <div>
                <h1>結果</h1>
                <ResultTextArea value={this.props.result} />
            </div>
        );
    }
}

class ResultTextArea extends React.Component {
    render() {
        return(
            <form className="uk-grid-small uk-grid">
                <div className="uk-width-1-2@s">
                    <textarea
                        defaultValue={this.props.value}
                        className="uk-textarea"
                        cols="10" rows="15">
                    </textarea>
                </div>
            </form>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
