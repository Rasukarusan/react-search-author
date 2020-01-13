import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

function InputArea(props) {
    return (
        <form class="uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
                <textarea class="uk-textarea"></textarea>
            </div>
        </form>
    );
}

function SearchButton(props) {
    return (
        <button>検索</button>
    );
}

class Search extends React.Component {
    render() {
        return (
            <div>
                <h1>著者検索</h1>
                <InputArea />
                <SearchButton />
            </div>
        );
    }
}

class Result extends React.Component {
    render() {
        return (
            <textarea> </textarea>
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
