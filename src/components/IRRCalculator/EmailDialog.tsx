
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendEmail, formatEmailBody } from "@/utils/emailSender";

interface EmailDialogProps {
  open: boolean;
  onClose: () => void;
  irr: number | null;
  xirr: number | null;
  initialInvestment: number;
  cashFlows: number[];
  cumulativeReturn: number;
  netProfit: number;
}

const EmailDialog: React.FC<EmailDialogProps> = ({
  open,
  onClose,
  irr,
  xirr,
  initialInvestment,
  cashFlows,
  cumulativeReturn,
  netProfit,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setLoading(true);
    
    if (irr === null) {
      setError("No IRR data to send");
      setLoading(false);
      return;
    }
    
    try {
      const emailBody = formatEmailBody(
        irr,
        xirr,
        initialInvestment,
        cumulativeReturn,
        netProfit
      );
      
      await sendEmail({
        email,
        subject: "Your IRR Analysis Results",
        body: emailBody,
      });
      
      // Reset and close on success
      setEmail("");
      onClose();
    } catch (err) {
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">Email IRR Results</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-charcoal">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input-field"
              required
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
          
          <div className="pt-2 text-sm text-gray-500">
            <p>
              We'll send you a detailed report with your IRR analysis results.
              Your email will not be used for marketing purposes.
            </p>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
