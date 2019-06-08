import React from 'react';
import './App.scss';
import {RelativeSize, Sigma} from 'react-sigma';
import Dagre from "react-sigma/es/Dagre";

class App extends React.Component {

	constructor(props) {
		super(props);
	}

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


	fillchiefWIthTokensArray = ({tmpString, tokens, tokenGroups, chiefWithTokens}) => {
		if (tmpString !== "" && tmpString.indexOf(",") >= 0) {
			let currentTokenGroup = tmpString.split(",").filter(Boolean);
			tokens = tokens.concat(currentTokenGroup);
			tokenGroups.push(currentTokenGroup);

			console.log("!!", tokens);
			console.log("tokengroups", tokenGroups);

			const chiefSet = new Set();
			let chiefToken = "";

			const filteredCtg = currentTokenGroup;

			filteredCtg
			.forEach(x => x.split("").filter(Boolean)
			.forEach(y => chiefSet.add(y)));

			console.log("filteredCtg", filteredCtg);

			if (currentTokenGroup.length > 1) {
				for (let value of chiefSet.values()) {
					chiefToken = chiefToken + value;
				}
				// console.log("!!!chief", chiefToken);
				chiefWithTokens.push([chiefToken, filteredCtg]);
				console.log(">>>", chiefWithTokens);
			}
		}
	};

  currentGroupofNodes = (chiefPositions, nodes) => {
		let result = [];
		if (chiefPositions.length === 1) {
			result = nodes.slice(0, chiefPositions[chiefPositions.length - 1]);
		} else if(chiefPositions.length > 1) {
			result = nodes.slice(chiefPositions[chiefPositions.length - 2], chiefPositions[chiefPositions.length - 1]);
		}

		console.log("result", result);
		return result;


	};
	handleInput = (event) => {
		// console.log(event.target.value);
		let tmp = event.target.value;
		this.isATokenGroupPresent(tmp);
		const stringGroups = tmp.split(";").filter(Boolean);
		let tokenGroups = [];
		let tokens = [];
		let chiefWithTokens = [];
		let chiefNodes = [];
		let chiefNodesIds = [];
		let nodes = [];
		let edges = [];
		let chiefPositions = [];
		for (let tmpString of stringGroups) {
			this.fillchiefWIthTokensArray({tmpString, tokens, tokenGroups, chiefWithTokens})
		}
		for (let cwt of chiefWithTokens) {
			for (let token of cwt[1]) {
				nodes.push({
					id: `n${nodes.length + 1}`,
					label: token,
					size: 3
				})
			}
			nodes.push({
				id: `n${nodes.length + 1}`,
				label: cwt[0],
				size: 3
			});
			const chiefNode = nodes.slice(nodes.length - 1)[0];
			chiefNodesIds.push(chiefNode.id);
			chiefNodes.push(chiefNode);
			chiefPositions.push(nodes.indexOf(chiefNode));
			console.log("edges", edges);
			for (let node of this.currentGroupofNodes(chiefPositions, nodes)) {
				if (chiefNodesIds.indexOf(node.id) !== -1) {
					continue;
				}
				edges.push({
					id: `e${edges.length + 1}`,
					source: `${node.id}`,
					target: chiefNode.id
				});
			}

			const chiefTokenAggregateSet = new Set();
			let chiefTokenAggregateLabel = "";

			if(chiefNodesIds.length>1) {

				for (let cn of chiefNodes) {
					cn.label.split("").forEach(x=> chiefTokenAggregateSet.add(x));
				}

				for (let char of chiefTokenAggregateSet.values()) {
					chiefTokenAggregateLabel = chiefTokenAggregateLabel + char;
				}

				const target = {
					id: `n${nodes.length + 1}`,
					label: chiefTokenAggregateLabel,
					size: 3
				};

				nodes.push(target);


				for(let node of nodes ) {
					if(chiefNodesIds.indexOf(node.id) === -1) {
						continue;
					}
					edges.push({
						id: `e${edges.length + 1}`,
						source: `${node.id}`,
						target: target.id
					});
				}
			}
		}

		this.setState((prevState, props) => (
			{nodes, edges}
		));
	};

	render() {
		return (
			<div className="App">

				<Sigma renderer="canvas" key={Math.floor(Math.random() * 1000 + 1 + Date.now())}
							 style={{maxWidth: "inherit", height: "800px"}} graph={this.state} settings={{
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
