import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        console.log(e.target);
        e.preventDefault();
    }

    render() {
        return (
            <button onClick={this.handleClick}>検索</button>
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
            textValue: '実験思考\n結局人生はアウトプットで決まる'
        }
    }

    render() {
        return (
            <div>
                <h1>著者検索</h1>
                <InputArea value={this.state.textValue} />
                <SearchButton />
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
