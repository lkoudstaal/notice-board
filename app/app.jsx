var NoticeBox = React.createClass({displayName: 'NoticeBox',
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  postNotice: function() {
        var notice = { body: this.state.value }
        $.post('http://localhost:3000/api/notice',
            notice,
            function() { console.log('Success'); });
  },
  render: function() {
      return (
          <div>
              <textarea
                  value={this.state.value}
                  onChange={this.handleChange}/>
              <button onClick={this.postNotice}>Submit</button>
          </div>);
  }
});
ReactDOM.render(
    React.createElement(NoticeBox, null),
    document.getElementById('content')
);