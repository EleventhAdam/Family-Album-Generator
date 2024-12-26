"use client";

import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  useReactFlow,
} from 'react-flow-renderer';
import { FamilyMember } from "../types";
import { CustomNode } from './CustomNode';
import { useTreeLayout } from '../hooks/useTreeLayout';

interface TreeLayoutProps {
  members: FamilyMember[];
  rootId: string;
  onMemberClick: (member: FamilyMember) => void;
  onMemberRemove: (memberId: string) => void;
  onConnect: (connection: Connection) => void;
}

export function TreeLayout({ 
  members, 
  onMemberClick, 
  onMemberRemove,
  onConnect 
}: TreeLayoutProps) {
  const { nodes, edges, onNodesChange, onEdgesChange } = useTreeLayout(
    members,
    onMemberClick,
    onMemberRemove
  );

  const nodeTypes = {
    customNode: CustomNode,
  };

  return (
    <div className="w-full h-[80vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultZoom={0.8}
        attributionPosition="bottom-left"
        nodesDraggable={true}
        preventScrolling={false}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}