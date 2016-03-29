var NoticeBoard = React.createClass({
    displayName: "NoticeBoard",
    getInitialState: function() {
        return { data: [] }
    },
    // componentDidMount: function() {
    //     $.get("http://localhost:3000/api/notices", {}, function(data) {
    //         console.log(data);
    //         this.setState({ data: data });
    //     }.bind(this));
    // },
    componentDidMount: function() {
        $.ajax({
            url: "api/notices",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="noticeBoard">
                <h1>Noticeboard</h1>
                <NoticeList data={this.state.data}/>
                <NoticeForm/>
            </div>);
    }
})

var NoticeList = React.createClass({
    render: function() {
        var noticeNodes = this.props.data.map(function(notice) {
            return (
                <Notice key={notice._id}>
                    {notice.body}
                </Notice>
            );
        });

        return (
            <div className="noticeList">
                {noticeNodes}
            </div>
        );
    }
});

var Notice = React.createClass({
  render: function() {
    return (
      <div className="notice">
        {this.props.children}
      </div>
    );
  }
});

var NoticeForm = React.createClass({displayName: "NoticeForm",
  getInitialState: function() {
    return { value: "" };
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  postNotice: function() {
        var notice = { body: this.state.value }
        $.post("http://localhost:3000/api/notice",
            notice,
            function() { console.log("Success"); });
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
    React.createElement(NoticeBoard, null),
    document.getElementById("content")
);