"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { FamilyMember as FamilyMemberType } from "../types";

interface Props {
  member: FamilyMemberType;
  onClick: (member: FamilyMemberType) => void;
}

export function FamilyMember({ member, onClick }: Props) {
  return (
    <Card 
      className="w-48 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(member)}
    >
      <CardHeader className="flex items-center space-y-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src={member.photo} alt={member.name} />
          <AvatarFallback>
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-center">{member.name}</h3>
      </CardHeader>
      <CardContent className="text-sm text-center text-muted-foreground">
        {member.birthDate && (
          <p>{member.birthDate} - {member.deathDate || 'Present'}</p>
        )}
      </CardContent>
    </Card>
  );
}