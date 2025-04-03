
import { toast } from "@/components/ui/use-toast";

interface EmailData {
  email: string;
  subject: string;
  body: string;
}

/**
 * Send results via email
 * Note: In a real application, this would connect to a backend service
 * This is a mock implementation that shows a toast notification
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  // In a real implementation, this would call your backend API
  // For demo purposes, we'll simulate success after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      toast({
        title: "Email sent!",
        description: `Results have been sent to ${data.email}`,
      });
      resolve(true);
    }, 1500);
  });
};

/**
 * Format email body with IRR results
 */
export const formatEmailBody = (
  irr: number,
  xirr: number | null,
  initialInvestment: number,
  cumulativeReturn: number,
  netProfit: number
): string => {
  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };
  
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #245e4f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Your IRR Analysis Results</h1>
          </div>
          
          <div style="background-color: #f8f8f8; border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 5px 5px;">
            <h2 style="color: #245e4f; border-bottom: 2px solid #7ac9a7; padding-bottom: 10px;">Investment Summary</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #fff;">
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Internal Rate of Return (IRR)</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatPercentage(irr)}</td>
              </tr>
              ${
                xirr
                  ? `<tr style="background-color: #f8f8f8;">
                      <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Extended IRR (XIRR)</td>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatPercentage(xirr)}</td>
                    </tr>`
                  : ""
              }
              <tr style="background-color: #fff;">
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Initial Investment</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatCurrency(initialInvestment)}</td>
              </tr>
              <tr style="background-color: #f8f8f8;">
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Total Return</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatCurrency(cumulativeReturn)}</td>
              </tr>
              <tr style="background-color: #fff;">
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Net Profit</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatCurrency(netProfit)}</td>
              </tr>
            </table>
            
            <div style="background-color: #e9c46a30; padding: 15px; border-left: 4px solid #e9c46a; margin: 20px 0;">
              <h3 style="color: #245e4f; margin-top: 0;">What does this mean?</h3>
              <p>Your IRR of ${formatPercentage(irr)} represents the annualized rate of return on your investment. This means your investment is effectively growing at this rate each year.</p>
              <p>Your initial investment of ${formatCurrency(initialInvestment)} has generated a total return of ${formatCurrency(cumulativeReturn)}, resulting in a net profit of ${formatCurrency(netProfit)}.</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://irrvisualizerpro.com" style="background-color: #245e4f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website For More Tools</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #777; font-size: 12px;">
            <p>This email was sent from IRR Visualizer Pro. Please do not reply to this email.</p>
            <p>© 2025 IRR Visualizer Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
