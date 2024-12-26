import dagre from 'dagre';
import { Node, Edge } from 'react-flow-renderer';

const nodeWidth = 200;
const nodeHeight = 150;
const nodePadding = 50;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export function layoutGraph(nodes: Node[], edges: Edge[]) {
  dagreGraph.setGraph({
    rankdir: 'TB',
    nodesep: nodePadding,
    ranksep: nodePadding * 2,
    edgesep: nodePadding,
  });

  // Clear the graph before adding new nodes
  dagreGraph.setGraph({});

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Apply the layout to the nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}