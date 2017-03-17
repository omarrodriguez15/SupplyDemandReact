/* BEER SALES CONTROL */
var BeerSalesControl = React.createClass({
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
            React.createElement('div', { className: "beerSalesControl" },
                React.createElement(PageHeaderControl),
                React.createElement(PricingInformationControl, { data: this.state.data }),
                React.createElement(PointOfSaleControl)
            )
        );
    }
});

/* PAGE HEADER CONTROL(S) */
var PageHeaderControl = React.createClass({
    render: function () {
        var PageHeader = ReactBootstrap.PageHeader;

        return (<div><ReactCenter><PageHeader>Dynamic Beer Algorithm</PageHeader></ReactCenter></div>);
    }
});

/* PRICING CONTROL(S) */
var PricingInformationControl = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well,
            Table = ReactBootstrap.Table;

        // Get Header Row
        var headerNode = React.createElement(PricingHeaderControl);

        // Builds the Rows
        var itemNodes = this.props.data.map(function (item) {
            return (
                React.createElement(PricingRowControl, { key: item.id }, item)
              );
        });

        return (<div>
                    <Well bsSize="large">
                        <Table>
                            <thead>
                                {headerNode}
                            </thead>
                            <tbody>
                                {itemNodes}
                            </tbody>
                        </Table>
                    </Well>
                </div>);
    }
});

var PricingHeaderControl = React.createClass({
    render: function () {
        // Build Header
        return (
            <tr>
                <th>Item</th>
                <th>Current Price</th>
                <th>Base Price</th>
                <th>Daily Min</th>
                <th>Daily Max</th>
            </tr>
            );
    }
});

var PricingRowControl = React.createClass({
    render: function () {
        var Glyphicon = ReactBootstrap.Glyphicon;
        var item = this.props.children;

        // Until added to API
        item.min = "N/A";
        item.max = "N/A";

        // Add Price Arrow
        var icon = "";
        if(item.price > item.basePrice)
            icon = React.createElement(Glyphicon, { glyph: "arrow-up", style: {color: "red", margin: "0 5 0 0"}});
        else
            icon = React.createElement(Glyphicon, { glyph: "arrow-down", style: { color: "green", margin: "0 5 0 0"}});

        // Build Row
        return (
            <tr>
                <td>{item.name}</td>
                <td>{icon}{item.price}</td>
                <td>{item.basePrice}</td>
                <td>{item.min}</td>
                <td>{item.max}</td>
            </tr>
            );
    }
});

/* POINT OF SALES CONTROL(S) */
var PointOfSaleControl = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well,
            Button = ReactBootstrap.Button,
            Form = ReactBootstrap.Form,
            FormGroup = ReactBootstrap.FormGroup,
            FormControl = ReactBootstrap.FormControl,
            ControlLabel = ReactBootstrap.ControlLabel;

        return (<div>
                    <Well>
                        <Form inline>
                            <FormGroup controlId="formControlsBeer1">
                                <ControlLabel>Beer 1</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Amount:" style={{width: '100px'}} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsBeer2">
                                <ControlLabel>Beer 2</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Amount:" style={{width: '100px'}} />
                            </FormGroup>
                            {' '}
                            <Button type="submit">
                                Purchase
                            </Button>
                        </Form>
                    </Well>
                </div>
                );
    }
});

/* DOM RENDERER */
ReactDOM.render(
    React.createElement(BeerSalesControl, {
        url: "http://supplydemandwebapi20170217105813.azurewebsites.net/api/pos", pollInterval: 2000
        /*submitUrl: "/comments/new",*/
    }),
    document.getElementById('beerContent')
);