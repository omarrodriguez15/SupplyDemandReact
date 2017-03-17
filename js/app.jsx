/* DOM RENDERER */
ReactDOM.render(
    React.createElement(OrchestratorControl, {
        url: "https://supplydemandwebapi20170217105813.azurewebsites.net/api/pos/custom", pollInterval: 2000
        /*submitUrl: "/comments/new",*/
    }),
    document.getElementById('app')
); //"http://supplydemandwebapi20170217105813.azurewebsites.net/api/pos/custom""http://localhost:50826/api/pos/custom"