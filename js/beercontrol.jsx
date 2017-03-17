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
                React.createElement(TickerControl, { data: this.state.data }),
                React.createElement(PageHeaderControl),
                React.createElement(PricingInformationControl, { data: this.state.data }),
                React.createElement(PointOfSaleControl, { data: this.state.data })
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

        // Add Price Arrow
        var icon = "";
        if(item.price > item.basePrice)
            icon = React.createElement(Glyphicon, { glyph: "arrow-up", style: {color: "red", margin: "0 0 0 5"}});
        else
            icon = React.createElement(Glyphicon, { glyph: "arrow-down", style: { color: "green", margin: "0 0 0 5"}});

        // Build Row
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.price}{icon}</td>
                <td>{item.basePrice}</td>
                <td>{item.min}</td>
                <td>{item.max}</td>
            </tr>
            );
    }
});

/* TICKER CONTROL */
var TickerControl = React.createClass({
    render: function () {
         // Builds the Rows
        var itemNodes = this.props.data.map(function (item) {
            return (
                React.createElement(TikerBeerItemControl, { key: item.id }, item)
              );
        });

        // Build Header
        return (
            <font style={{'fontSize': 23}} color='black'>
               <marquee behavior='scroll' direction='left' scrollamount='10'>
                  {itemNodes}
               </marquee>
            </font>
         );
    }
});

var TikerBeerItemControl = React.createClass({
    render: function () {
        var Glyphicon = ReactBootstrap.Glyphicon;
        var item = this.props.children;

        var icon = "";
        var priceColor = "";
         if(item.price > item.basePrice)
         {
            priceColor = "red";
            icon = React.createElement(Glyphicon, { glyph: "arrow-up", style: {color: priceColor, margin: "0 5 0 0"}});
         }
         else
         {
            priceColor = "green";
            icon = React.createElement(Glyphicon, { glyph: "arrow-down", style: { color: priceColor, margin: "0 5 0 0"}});
         }
               

        // Build Row
        return (
            <span>
               {item.name}<span style={{color: priceColor}}> %{item.percentchange}</span>{icon}  
            </span>
         );
    }
});

/* POINT OF SALES CONTROL(S) */
var PointOfSaleControl = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well,
            FormGroup = ReactBootstrap.FormGroup,
            Button = ReactBootstrap.Button,
            Form = ReactBootstrap.Form,
            Col = ReactBootstrap.Col;

        // Builds the Rows
        var formNodes = this.props.data.map(function (item) {
            return (
                React.createElement(PointOfSaleSubControl, { key: item.id }, item)
              );
        });

        return (<div>
                    <Well>
                        <Form horizontal>
                            {formNodes}
                            <FormGroup>
                                <Col smOffset={7} sm={5}>
                                    <Button type="submit"> Purchase </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Well>
                </div>
                );
    }
});

var PointOfSaleSubControl = React.createClass({
    getInitialState: function () {
        return { amount: 0 }
    },
    onAddition: function () {
        var value = this.state.amount;
        value += 1;

        this.setState({ amount: value });
    },
    onSubtraction: function () {
        var value = this.state.amount;

        if(value-1 >=0)
            value -= 1;
        else
            value = 0;

        this.setState({ amount: value });
    },
    render: function () {
        var FormGroup = ReactBootstrap.FormGroup,
            InputGroup = ReactBootstrap.InputGroup,
            FormControl = ReactBootstrap.FormControl,
            ControlLabel = ReactBootstrap.ControlLabel,
            Button = ReactBootstrap.Button,
            Col = ReactBootstrap.Col;

        var item = this.props.children;
        var controlId = "formControl" + item.name;

        return (
            <FormGroup controlId={controlId}>
                <Col componentClass={ControlLabel} smOffset={3} sm={2}> {item.name} </Col>    
                <Col sm={7}>
                    <InputGroup>
                        <Button onClick={this.onSubtraction}> - </Button>
                        <Button onClick={this.onAddition}> + </Button>
                        <FormControl type="text" value={this.state.amount} style={{ width: '100px', background:'white' }} readOnly/>
                    </InputGroup>
                </Col>
            </FormGroup>
            );
    }
});

/* DOM RENDERER */
ReactDOM.render(
    React.createElement(BeerSalesControl, {
        url: "https://supplydemandwebapi20170217105813.azurewebsites.net/api/pos/custom", pollInterval: 2000
        /*submitUrl: "/comments/new",*/
    }),
    document.getElementById('beerContent')
); //"http://supplydemandwebapi20170217105813.azurewebsites.net/api/pos/custom""http://localhost:50826/api/pos/custom"