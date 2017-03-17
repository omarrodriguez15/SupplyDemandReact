var CommentBox = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },
    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
    handleCommentSubmit: function (comment) {
        // Submit to server and refresh list
        var data = new FormData();
        data.append('author', comment.author);
        data.append('text', comment.text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    },
    render: function () {
        return (
            React.createElement('div', {className: "commentBox"},
                React.createElement('h1', null, "Comments"),
                React.createElement(CommentList, { data: this.state.data }),
                React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
            )
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                React.createElement(Comment, { author: comment.author, key: comment.id }, comment.text)
              );
        });
        return (
            React.createElement('div', {className: "commentList"}, commentNodes)
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: '', text: '' };
    },
    handleAuthorChange: function(e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function (e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author)
            return;

        //Send to server and clear form
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    },
    render: function () {
        return (
            React.createElement('form', { className: "commentForm",onSubmit: this.handleSubmit },
                React.createElement('input', {
                    type: "text",
                    placeholder: "Your name",
                    value: this.state.author,
                    onChange: this.handleAuthorChange
                }),
                React.createElement('input', {
                    type: "text",
                    placeholder: "Your comment..",
                    value: this.state.text,
                    onChange: this.handleTextChange
                }),
                React.createElement('input', { type: "submit", value: "Post"})
            )
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            React.createElement('div', {className: "comment"},
                React.createElement('h2', {className: "commentAuthor"}, this.props.author),
                React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CommentBox, { url: "/comments", submitUrl: "/comments/new", pollInterval: 2000 }),
    document.getElementById('commentContent')
);