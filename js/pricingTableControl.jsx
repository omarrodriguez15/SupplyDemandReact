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