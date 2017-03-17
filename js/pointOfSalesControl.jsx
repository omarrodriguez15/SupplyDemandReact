/* POINT OF SALES CONTROL(S) */
var PointOfSaleControl = React.createClass({
    getInitialState: function () {
        return { childCount: 0 }
    },
    onSubmit: function (){
        var postData = [];
        for(var i = 0; i < this.state.childCount; i++)
        {
            var child = this.refs['POSChild-' + i];
            var item = child.getPostData();

            if(item.AmountSold > 0)
                postData.push(item);
        }

        this.onPostToServer(postData);
    },
    onPostToServer: function(data){
        var request = new XMLHttpRequest();
        request.open('POST', 'https://supplydemandwebapi20170217105813.azurewebsites.net/api/pos/multiple', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var response = JSON.parse(request.responseText);
                if (request.status === 200 && response.status === 'OK') {
                    console.log('successful');
                } else {
                    console.log('failed');
                }
            }
        };
        request.send(data);
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            FormGroup = ReactBootstrap.FormGroup,
            Button = ReactBootstrap.Button,
            Form = ReactBootstrap.Form,
            Col = ReactBootstrap.Col;

        // Builds the Rows
        var index = 0;
        var formNodes = this.props.data.map(function (item) {
            return (
                React.createElement(PointOfSaleSubControl, { key: item.id, ref: "POSChild-" + index++, id: item.id }, item)
              );
        });
        this.state.childCount = index;

        return (<div>
                    <Well>
                        <Form horizontal>
                            {formNodes}
                            <FormGroup>
                                <Col smOffset={7} sm={5}>
                                    <Button type="submit" onClick={this.onSubmit}> Purchase </Button>
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
        return { amount: 0, id: 0 }
    },
    getPostData: function (value){
        var item = {itemId: this.props.id, AmountSold: this.state.amount, time: Date.now()};
        return item;
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