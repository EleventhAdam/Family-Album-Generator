"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FamilyMember } from "../types";

interface MemberDialogProps {
  member: FamilyMember | null;
  onClose: () => void;
}

export function MemberDialog({ member, onClose }: MemberDialogProps) {
  if (!member) return null;

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {member.photo && (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          {member.bio && (
            <p className="text-sm text-muted-foreground">{member.bio}</p>
          )}
          {member.birthDate && (
            <p className="text-sm">
              Birth Date: {new Date(member.birthDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}