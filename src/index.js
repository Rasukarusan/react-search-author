import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const SEARCH_BUTTON_TEXT_DEFAULT = '検索';
const SEARCH_BUTTON_TEXT_RUNNING = '検索中...';

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            disabled: this.props.disabled,
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        let value = e.target.innerHTML === SEARCH_BUTTON_TEXT_DEFAULT ?
            SEARCH_BUTTON_TEXT_RUNNING : SEARCH_BUTTON_TEXT_DEFAULT;
        this.setState({
            value: value,
            disabled: !e.target.disabled,
        });
        this.search();
        e.preventDefault();
    }

    search() {
        fetch('https://www.googleapis.com/books/v1/volumes?q=実験思考')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    value: SEARCH_BUTTON_TEXT_DEFAULT,
                    disabled: false
                });
            },
            (error) => {
                this.setState({
                    value: SEARCH_BUTTON_TEXT_DEFAULT,
                    disabled: false
                });
            }
        )
    }

    render() {
        return (
            <button onClick={this.handleClick} disabled={this.state.disabled}>
                {this.state.value}
            </button>
        );
    }
}

class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value}
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form className="uk-grid-small uk-grid">
                <div className="uk-width-1-2@s">
                    <textarea
                        value={this.state.value}
                        onChange={this.onChange}
                        className="uk-textarea"
                        cols="10" rows="15">
                    </textarea>
                </div>
            </form>
        );
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '実験思考\n結局人生はアウトプットで決まる',
            buttonText: SEARCH_BUTTON_TEXT_DEFAULT,
            buttonDisabled : false,
        }
    }

    render() {
        return (
            <div>
                <h1>著者検索</h1>
                <InputArea value={this.state.textValue} />
                <SearchButton value={this.state.buttonText} disabled={this.state.disabled} />
            </div>
        );
    }
}

class Result extends React.Component {
    render() {
        return (
            <div>
                <h1>結果</h1>
                <InputArea />
            </div>
        );
    }

}

function App() {
    return (
        <div>
            <Search />
            <hr />
            <Result />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
