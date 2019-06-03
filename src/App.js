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
				"label": "A node",

				"size": 3
			},
			{
				"id": "n1",
				"label": "Another node",

				"size": 3
			},
			{
				"id": "n2",
				"label": "And a last one",

				"size": 3
			}
		],
		edges: [
			{
				"id": "e0",
				"source": "n0",
				"target": "n1"
			},
			{
				"id": "e1",
				"source": "n1",
				"target": "n2"
			},
			{
				"id": "e2",
				"source": "n2",
				"target": "n0"
			}
		]
	};



	componentDidMount() {

	}



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
					minEdgeSize: 2,
					maxEdgeSize: 2,
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
					<Dagre rankDir="TB" directed={true} />
				</Sigma>
			</div>
		);
	}
}

export default App;
