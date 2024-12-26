"use client";

import { useState, useCallback } from "react";
import { Connection } from 'react-flow-renderer';
import { TreeLayout } from "./TreeLayout";
import { AddMemberDialog } from "./AddMemberDialog";
import { MemberDialog } from "./MemberDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FamilyMember } from "../types";

export function FamilyTree() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [rootId, setRootId] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleAddMember = (newMember: Omit<FamilyMember, 'id'>) => {
    const member: FamilyMember = {
      ...newMember,
      id: Math.random().toString(36).substr(2, 9),
    };

    setMembers((prev) => [...prev, member]);
    if (!rootId) {
      setRootId(member.id);
    }
    setIsAddingMember(false);
  };

  const handleRemoveMember = useCallback((memberId: string) => {
    setMembers((prev) => {
      // First, find the member to be removed
      const memberToRemove = prev.find(m => m.id === memberId);
      if (!memberToRemove) return prev;

      // Get all descendants of the member
      const getDescendants = (id: string): string[] => {
        const children = prev.filter(m => m.parentIds.includes(id));
        return [
          id,
          ...children.flatMap(child => getDescendants(child.id))
        ];
      };

      const idsToRemove = getDescendants(memberId);

      // Filter out the member and its descendants
      const remainingMembers = prev.filter(m => !idsToRemove.includes(m.id));

      // Update references in remaining members
      return remainingMembers.map(m => ({
        ...m,
        parentIds: m.parentIds.filter(id => !idsToRemove.includes(id)),
        spouseIds: m.spouseIds.filter(id => !idsToRemove.includes(id)),
        childrenIds: m.childrenIds.filter(id => !idsToRemove.includes(id)),
      }));
    });

    if (memberId === rootId) {
      setRootId("");
    }
  }, [rootId]);

  const handleConnect = useCallback((connection: Connection) => {
    const { source, target } = connection;
    if (!source || !target) return;

    setMembers(prev => {
      return prev.map(member => {
        if (member.id === target) {
          return {
            ...member,
            parentIds: [...new Set([...member.parentIds, source])]
          };
        }
        return member;
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Family Tree</h1>
          <Button onClick={() => setIsAddingMember(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Family Member
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <TreeLayout
            members={members}
            rootId={rootId}
            onMemberClick={setSelectedMember}
            onMemberRemove={handleRemoveMember}
            onConnect={handleConnect}
          />
        </div>

        <AddMemberDialog
          open={isAddingMember}
          onOpenChange={setIsAddingMember}
          onAdd={handleAddMember}
          existingMembers={members}
        />

        <MemberDialog
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </div>
    </div>
  );
}