var NoticeBoard = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number.isRequired
    },
    loadNoticesFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadNoticesFromServer();
        setInterval(this.loadNoticesFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="noticeBoard">
                <h1>Noticeboard</h1>
                <NoticeForm/>
                <NoticeList data={this.state.data}/>
            </div>);
    }
});

var NoticeList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function () {
        var noticeNodes = this.props.data.map(function (notice) {
            return (
                <Notice key={notice._id}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="text-right"><small>{notice.createdAt}</small></div>
                        </div>
                        <div className="panel-body">
                            <div>{notice.body}</div>
                        </div>
                    </div>
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
    propTypes: {
        children: React.PropTypes.object
    },
    render: function () {
        return (
            <div className="notice">
                {this.props.children}
            </div>
        );
    }
});

var NoticeForm = React.createClass({
    displayName: "NoticeForm",
    getInitialState: function () {
        return { value: "" };
    },
    handleChange: function (event) {
        this.setState({ value: event.target.value });
    },
    postNotice: function () {
        var notice = { body: this.state.value };
        $.post("http://localhost:3000/api/notice",
               notice,
               function () { console.log("Success"); });
    },
    render: function () {
        return (
            <div>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="newNotice">New Notice: </label>
                        <textarea
                            id="newNotice"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-default" onClick={this.postNotice}>Post Notice</button>
                    </div>
                </form>
            </div>);
    }
});
ReactDOM.render(
    <NoticeBoard url="api/notices" pollInterval={2000} />,
    document.getElementById("content")
);
