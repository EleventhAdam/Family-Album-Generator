"use client";

import { Handle, Position } from 'react-flow-renderer';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FamilyMember } from "../types";

interface CustomNodeProps {
  data: {
    member: FamilyMember;
    onClick: (member: FamilyMember) => void;
    onRemove: (memberId: string) => void;
  };
}

export function CustomNode({ data: { member, onClick, onRemove } }: CustomNodeProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(member.id);
  };

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-gray-400"
      />
      <Card 
        className="w-48 cursor-pointer hover:shadow-lg transition-shadow bg-white relative group drag-handle"
        onClick={() => onClick(member)}
      >
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity z-50"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
        <CardHeader className="flex items-center space-y-2 p-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={member.photo} alt={member.name} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-center text-sm">{member.name}</h3>
        </CardHeader>
        <CardContent className="text-xs text-center text-muted-foreground p-2">
          {member.birthDate && (
            <p>{member.birthDate} - {member.deathDate || 'Present'}</p>
          )}
        </CardContent>
      </Card>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-gray-400"
      />
    </div>
  );
}