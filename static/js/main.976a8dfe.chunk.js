(this["webpackJsonpreact-blog-assets-page"]=this["webpackJsonpreact-blog-assets-page"]||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(2),s=a(4),c=a(3),u=a(6),i=a(5),l=(a(11),a(0)),o=a.n(l),h=a(8),p=a.n(h),b=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).state={value:a.props.value},a.onChange=a.onChange.bind(Object(u.a)(a)),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"onChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){return o.a.createElement("form",{className:"uk-grid-small uk-grid"},o.a.createElement("div",{className:"uk-width-1-2@s"},o.a.createElement("textarea",{value:this.state.value,onChange:this.onChange,className:"uk-textarea",cols:"10",rows:"15"})))}}]),t}(o.a.Component),m=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("button",{onClick:this.props.onClick(this),disabled:this.props.disabled},this.props.value)}}]),t}(o.a.Component),d=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"\u8457\u8005\u691c\u7d22"),o.a.createElement(b,{value:this.props.inputText}),o.a.createElement(m,{value:this.props.searchButtonText,disabled:this.props.searchButtonDisabled,onClick:this.props.onClick}))}}]),t}(o.a.Component),f=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).state={inputText:"\u5b9f\u9a13\u601d\u8003\n\u7d50\u5c40\u4eba\u751f\u306f\u30a2\u30a6\u30c8\u30d7\u30c3\u30c8\u3067\u6c7a\u307e\u308b",searchButtonText:"\u691c\u7d22",searchButtonDisabled:!1,result:""},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"handleClick",value:function(e){var t=this,a="\u691c\u7d22"===e.target.innerHTML?"\u691c\u7d22\u4e2d...":"\u691c\u7d22";this.setState({searchButtonText:a,searchButtonDisabled:!e.target.disabled}),this.state.inputText.split("\n").forEach((function(e){return t.search(e)})),e.preventDefault()}},{key:"search",value:function(e){var t=this;fetch("https://www.googleapis.com/books/v1/volumes?q="+e).then((function(e){return e.json()})).then((function(a){var n=a.items[0],r=n.volumeInfo.authors.pop(),s=n.volumeInfo.categories.pop(),c=e+"\t"+r+"\t"+s+"\n";t.setState({searchButtonText:"\u691c\u7d22",searchButtonDisabled:!1,result:t.state.result+c})}),(function(e){t.setState({searchButtonText:"\u691c\u7d22",searchButtonDisabled:!1})}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(d,{inputText:this.state.inputText,searchButtonText:this.state.searchButtonText,searchButtonDisabled:this.state.searchButtonDisabled,onClick:function(){return e.handleClick.bind(e)}}),o.a.createElement("hr",null),o.a.createElement(v,{result:this.state.result}))}}]),t}(o.a.Component),v=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"\u7d50\u679c"),o.a.createElement(j,{value:this.props.result}))}}]),t}(o.a.Component),j=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("form",{className:"uk-grid-small uk-grid"},o.a.createElement("div",{className:"uk-width-1-2@s"},o.a.createElement("textarea",{defaultValue:this.props.value,className:"uk-textarea",cols:"10",rows:"15"})))}}]),t}(o.a.Component);p.a.render(o.a.createElement(f,null),document.getElementById("root"))},11:function(e,t,a){},9:function(e,t,a){e.exports=a(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.976a8dfe.chunk.js.map