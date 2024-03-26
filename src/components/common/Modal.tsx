import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  isCloseIcon?: boolean;
}
export function Modal({
  className,
  title,
  isOpen,
  onClose,
  children,
  isCloseIcon = false,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn("py-[35px] px-[70px] rounded-[20px]", className)}
        isCloseIcon={isCloseIcon}
      >
        <DialogHeader className="text-[22px] font-[600] mb-[30px]">
          {title}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
