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
