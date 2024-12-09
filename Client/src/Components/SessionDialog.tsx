import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";

interface dialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionDialog({ isOpen, onClose }: dialogProps) {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Unauthorized</DialogHeader>
        <DialogDescription>Your session has expired!</DialogDescription>

        <DialogFooter>
          <Button onClick={() => navigate("/")}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
