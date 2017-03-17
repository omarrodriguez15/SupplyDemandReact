var OrchestratorControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval)
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
    render: function () {
        return (
            React.createElement('div', { className: "orchestratorControl" },
                React.createElement(TickerControl, { data: this.state.data }),
                React.createElement(PageHeaderControl),
                React.createElement(PricingInformationControl, { data: this.state.data }),
                React.createElement(PointOfSaleControl, { data: this.state.data })
            )
        );
    }
});