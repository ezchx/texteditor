// COMMENT
var Comment = React.createClass({
    rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
    
  render: function() {
    return (
      <div className="comment">
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});


// BOX
var CommentBox = React.createClass({

  handleCommentSubmit: function(comment) {
    var comments = [];
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },  
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Text Editor</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <br></br>
        <CommentList data={this.state.data} />      
      </div>
    );
  }
});


// FORM
var CommentForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },  
  handleSubmit: function(e) {
    this.setState({text: e.target.value}); 
    var text = e.target.value;
    //$("#debug").html(e.target.value);
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({text: text});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.getInitialState}>
        <textarea
          type="text"
          id="inputBox"
          placeholder="type something..."
          value={this.state.text}
          onChange={this.handleSubmit}
        />
        <div><input type="submit" value="Clear" /></div>
      </form>
    );
  }
});


// LIST
var CommentList = React.createClass({
  render: function() {
      var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment>
          {comment.text}
        </Comment>
      );
    });
      
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});


ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);