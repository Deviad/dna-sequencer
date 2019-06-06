import React from 'react';
import './App.scss';
import {RelativeSize, Sigma} from 'react-sigma';
import Dagre from "react-sigma/es/Dagre";

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	myGraph = {
		nodes: [
			{
				"id": "n1",
				"label": "AT",

				"size": 3
			},
			{
				"id": "n2",
				"label": "AC",

				"size": 3
			},
			{
				"id": "n3",
				"label": "AA",
				"size": 3
			},
			{
				"id": "n4",
				"label": "TG",
				"size": 3
			},
			{
				"id": "n5",
				"label": "TC",
				"size": 3
			},
			{
				"id": "n6",
				"label": "ATC",
				"size": 3
			},
			{
				"id": "n7",
				"label": "TGC",
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
			{
				"id": "n11",
				"label": "ATGC",
				"size": 3
			},
		],
		edges: [
			{
				"id": "e1",
				"source": "n1",
				"target": "n6"
			},
			{
				"id": "e2",
				"source": "n2",
				"target": "n6"
			},
		]
	};


componentDidUpdate(prevProps, prevState, snapshot) {

	console.log("prevstate vs currentstate", [prevState, this.state]);

}

	isATokenGroupPresent = (tmp) => {
		if (tmp.indexOf(";") === -1) {
			return false;
		}
	};

	state = {
		nodes: [],
		edges: []
	};
	handleInput = (event) => {
		// console.log(event.target.value);
		let tmp = event.target.value;
		this.isATokenGroupPresent(tmp);
		const stringGroups = tmp.split(";");
		if (stringGroups.length > 1) {
			let tokenGroups = [];
			let tokens = [];

			let chiefWithTokens = [];

			let chiefNodes = [];

			let chiefNodesIds= [];


			for (let tmpString of stringGroups) {
				if (tmpString !== "" && tmpString.indexOf(",") >= 0) {
					let currentTokenGroup = tmpString.split(",");
					tokens = tokens.concat(currentTokenGroup);
					tokenGroups.push(currentTokenGroup);
					// tokens.filter(token=> token!== "");
					console.log("!!", tokens);
					console.log("tokengroups", tokenGroups);

					const chiefSet = new Set();
					let chiefToken = "";

					const filteredCtg = currentTokenGroup;

					filteredCtg
					.forEach(x => x.split("")
					.forEach(y => chiefSet.add(y)));

					for (let value of chiefSet.values()) {
						chiefToken = chiefToken + value;
					}
					console.log("!!!chief", chiefToken);
					chiefWithTokens.push([chiefToken, filteredCtg]);
					console.log(">>>", chiefWithTokens);
				}
			}
			this.setState((prevState, props) => {
				let nodes = [];
				let edges = [];

				for (let cwt of chiefWithTokens) {
					for (let token of cwt[1]) {
						nodes.push({
							id: `n${nodes.length+1}`,
							label: token,
							size: 3
						})
					}
					nodes.push({
						id: `n${nodes.length+1}`,
						label: cwt[0],
						size: 3
					});

					const chiefNode = nodes.slice(nodes.length-1)[0];

					chiefNodes.push(chiefNode);

					chiefNodesIds.push(chiefNode.id);

					// console.log(";)", chiefNode);

					for (let token of cwt[1]) {
						edges.push({
							id: `e${edges.length+1}`,
							source: `n${edges.length+1}`,
							target: chiefNode.id
						});
					}
					for(let cn of chiefNodes) {
						edges = edges.filter(x => x.source !== cn.id);
					}

					const masterChiefSet = new Set();
					let masterChiefToken = "";

					for(let cn of chiefNodes) {

						for (let char of cn.label.split("")) {
							masterChiefSet.add(char);
						}
					}
					for (let c of masterChiefSet.values()) {
						masterChiefToken = masterChiefToken + c;
					}

					console.log("something", masterChiefToken);

					// nodes.push({
					// 	id: `n${nodes.length+1}`,
					// 	label: masterChiefToken,
					// 	size: 3
					// });
					//
					// for(let cn of chiefNodes) {
					//
					// 	edges.push({
					// 		id: `e${edges.length+1}`,
					// 		source: `${cn.id}`,
					// 		target: `n${nodes.length+1}`
					// 	});
					// }
				}
				return {nodes, edges}
			})
		}
	};

	render() {
		return (
			<div className="App">

				<Sigma renderer="canvas"   key={Math.floor(Math.random() * 1000+1+ Date.now())}  style={{maxWidth: "inherit", height: "800px"}} graph={this.state} settings={{
					drawEdges: true,
					clone: false,
					// edgeLabelSize: 'proportional',
					// nodesPowRatio: 1,
					autoRescale: true,
					// minArrowSize: 5,
					scalingMode: 'inside',
					minEdgeSize: 1,
					maxEdgeSize: 1,
					labelThreshold: 0,
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
					<Dagre rankDir="BT" directed={true}/>
				</Sigma>
				<div>
					<input type="text" onInput={this.handleInput}/>
				</div>
			</div>
		);
	}
}

export default App;
