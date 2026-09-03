"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { useState } from "react";

export const LogoutButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const handleDialogClose = async () => {
        await authClient.signOut()
        setIsDialogOpen(false);
        router.push("/")
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                    size="sm"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Logout
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
                {/* Custom Header */}
                <div className="px-6 py-4 flex justify-between items-center border-b border-border/20">
                    <DialogHeader className="space-y-0">
                        <DialogTitle className="text-xl font-bold">
                            Are you sure?
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            You can login afterwards again
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 px-6 py-4 border-t border-border/20">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-red-600 w-full sm:w-auto hover:bg-muted"
                            onClick={handleDialogClose}
                        >
                            Logout
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutButton