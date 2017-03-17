var BeerSalesControl = React.createClass({
   render: function () {
      return (<div>Beer #1 $3.75 -0.937%</div>);
   }
});
ReactDOM.render(
    React.createElement(BeerSalesControl),
    document.getElementById('tickerContent')
);