"use client";

import { FamilyMember as FamilyMemberType } from "../types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface TreeNodeProps {
  member: FamilyMemberType;
  onClick: (member: FamilyMemberType) => void;
}

export function TreeNode({ member, onClick }: TreeNodeProps) {
  return (
    <div className="relative">
      <Card 
        className="w-48 cursor-pointer hover:shadow-lg transition-shadow bg-white"
        onClick={() => onClick(member)}
      >
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
    </div>
  );
}