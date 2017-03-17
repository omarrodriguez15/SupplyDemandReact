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