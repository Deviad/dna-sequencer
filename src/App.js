import React from 'react';
import './App.scss';
import {RandomizeNodePositions, RelativeSize, Sigma, ForceAtlas2} from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink'
import Dagre from "react-sigma/es/Dagre";

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	myGraph = {
		nodes: [
			{
				"id": "n0",
				"label": "AT",

				"size": 3
			},
			{
				"id": "n1",
				"label": "AC",

				"size": 3
			},
			{
				"id": "n2",
				"label": "AA",
				"size": 3
			},
			{
				"id": "n3",
				"label": "TG",
				"size": 3
			},
			{
				"id": "n4",
				"label": "TC",
				"size": 3
			},
			{
				"id": "n5",
				"label": "ATC",
				"size": 3
			},
			{
				"id": "n6",
				"label": "TGC",
				"size": 3
			},
			{
				"id": "n7",
				"label": "ATGC",
				"size": 3
			},
			{
				"id": "n8",
				"label": "ATGC",
				"size": 3
			},
			{
				"id": "n9",
				"label": "ATGC",
				"size": 3
			},
			{
				"id": "n10",
				"label": "ATGC",
				"size": 3
			},
		],
		edges: [
			{
				"id": "e0",
				"source": "n0",
				"target": "n5"
			},
			{
				"id": "e1",
				"source": "n1",
				"target": "n5"
			},
			{
				"id": "e2",
				"source": "n2",
				"target": "n5"
			},
			{
				"id": "e3",
				"source": "n3",
				"target": "n6"
			},
			{
				"id": "e4",
				"source": "n4",
				"target": "n6"
			},
			{
				"id": "e5",
				"source": "n5",
				"target": "n7"
			},
			{
				"id": "e6",
				"source": "n6",
				"target": "n7"
			},
			{
				"id": "e7",
				"source": "n8",
				"target": "n7"
			},
			{
				"id": "e8",
				"source": "n9",
				"target": "n7"
			},
			{
				"id": "e9",
				"source": "n10",
				"target": "n7"
			}
		]
	};



	componentDidMount() {

	}

	tokenizer = (tmpString) => {

	};


	isATokenGroupPresent = (tmp) => {
		if(tmp.indexOf(";") === -1) {
			return false;
		}
	};

	state ={
		nodes: [],
		edges: []
	};
	handleInput = (event) => {

		// console.log(event.target.value);

		let tmp = event.target.value;

		this.isATokenGroupPresent(tmp);

		const stringGroups = tmp.split(";");
		if(stringGroups.length>1) {
			let tokenGroups = [];
			let tokens = [];
			for(let tmpString of stringGroups) {
				if (tmpString !== "" && tmpString.indexOf(",") >= 0) {
					let currentTokens = tmpString.split(",");
					tokens = tokens.concat(currentTokens);
					tokenGroups.push(currentTokens);
					// tokens.filter(token=> token!== "");
					console.log("!!", tokens);
					console.log("tokengroups", tokenGroups);
				}

			}


		}




	};

	render() {
		return (
			<div className="App">

				<Sigma renderer="webgl"  style={{maxWidth:"inherit", height:"800px"}}  graph={this.myGraph} settings={{
					drawEdges: true,
					clone: false,
					// edgeLabelSize: 'proportional',
					// nodesPowRatio: 1,
					autoRescale: true,
					// minArrowSize: 5,
					scalingMode: 'inside',
					minEdgeSize: 1,
					maxEdgeSize: 1,
					labelThreshold:0,
					defaultNodeColor: '#ec5148'

					// worker: true,
					// barnesHutOptimize: false,
					// autoStop: true,
					// background: true,
					// easing: 'cubicInOut',
					// alignNodeSiblings: true,
					// nodeSiblingsScale: 1,
					// nodeSiblingsAngleMin: 0.3

				}}>
					{/*<ForceLink background randomizeFactor={1.618} alignNodeSiblings={false} nodeSiblingsScale={0} nodeSiblingsAngleMin={0.1} adjustSizes={false} randomize="globally"/>*/}
					<RelativeSize initialSize={8}/>
					{/*<ForceAtlas2/>*/}
					<Dagre rankDir="BT" directed={true} />
				</Sigma>
				<div>
					<input type="text" onInput={this.handleInput} />
				</div>
				</div>
		);
	}
}

export default App;
