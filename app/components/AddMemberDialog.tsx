"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FamilyMember } from "../types";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: Omit<FamilyMember, 'id'>) => void;
  existingMembers: FamilyMember[];
}

export function AddMemberDialog({ open, onOpenChange, onAdd, existingMembers }: AddMemberDialogProps) {
  const [newMember, setNewMember] = useState({
    name: "",
    photo: "",
    birthDate: "",
    bio: "",
    parentIds: [] as string[],
    spouseIds: [] as string[],
    childrenIds: [] as string[],
  });

  const handleParentSelect = (parentId: string) => {
    if (newMember.parentIds.length < 2) {
      setNewMember((prev) => ({
        ...prev,
        parentIds: [...prev.parentIds, parentId],
      }));
    }
  };

  const removeParent = (parentId: string) => {
    setNewMember((prev) => ({
      ...prev,
      parentIds: prev.parentIds.filter((id) => id !== parentId),
    }));
  };

  const handleAdd = () => {
    onAdd(newMember);
    setNewMember({
      name: "",
      photo: "",
      birthDate: "",
      bio: "",
      parentIds: [],
      spouseIds: [],
      childrenIds: [],
    });
  };

  const selectedParents = existingMembers.filter((member) =>
    newMember.parentIds.includes(member.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <Label>Parents (Max 2)</Label>
            <div className="space-y-2">
              {selectedParents.map((parent) => (
                <div key={parent.id} className="flex items-center justify-between bg-muted p-2 rounded">
                  <span>{parent.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeParent(parent.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {newMember.parentIds.length < 2 && (
                <Select
                  onValueChange={handleParentSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingMembers
                      .filter((member) => !newMember.parentIds.includes(member.id))
                      .map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="photo">Photo URL</Label>
            <Input
              id="photo"
              value={newMember.photo}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, photo: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={newMember.birthDate}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, birthDate: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={newMember.bio}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>
          <Button onClick={handleAdd}>Add Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}