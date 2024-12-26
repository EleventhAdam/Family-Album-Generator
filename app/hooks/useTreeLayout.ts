"use client";

import { useCallback, useEffect } from 'react';
import { Node, Edge, useNodesState, useEdgesState } from 'react-flow-renderer';
import { FamilyMember } from '../types';
import { layoutGraph } from '../utils/graphLayout';

export function useTreeLayout(
  members: FamilyMember[],
  onMemberClick: (member: FamilyMember) => void,
  onMemberRemove: (memberId: string) => void
) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createNodesAndEdges = useCallback(() => {
    const newNodes: Node[] = members.map((member) => ({
      id: member.id,
      type: 'customNode',
      position: { x: 0, y: 0 },
      data: { member, onClick: onMemberClick, onRemove: onMemberRemove },
      dragHandle: '.drag-handle',
    }));

    const newEdges: Edge[] = [];
    members.forEach((member) => {
      member.parentIds.forEach((parentId) => {
        newEdges.push({
          id: `${parentId}-${member.id}`,
          source: parentId,
          target: member.id,
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#64748b', strokeWidth: 2 },
        });
      });
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutGraph(newNodes, newEdges);
    
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [members, onMemberClick, onMemberRemove, setNodes, setEdges]);

  useEffect(() => {
    createNodesAndEdges();
  }, [createNodesAndEdges]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  };
}