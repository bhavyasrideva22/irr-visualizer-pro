
/**
 * Calculate the Internal Rate of Return (IRR) using the Newton-Raphson method
 * @param cashFlows Array of cash flows (first one is usually negative as it's the initial investment)
 * @param initialGuess Initial guess for IRR
 * @param tolerance Convergence tolerance
 * @param maxIterations Maximum number of iterations
 * @returns The calculated IRR or null if convergence fails
 */
export function calculateIRR(
  cashFlows: number[],
  initialGuess: number = 0.1,
  tolerance: number = 1e-10,
  maxIterations: number = 1000
): number | null {
  if (!cashFlows || cashFlows.length < 2) {
    return null;
  }

  let guess = initialGuess;
  
  for (let i = 0; i < maxIterations; i++) {
    const { npv, derivative } = calculateNPVAndDerivative(cashFlows, guess);
    
    // Check if we're close enough to zero
    if (Math.abs(npv) < tolerance) {
      return guess;
    }
    
    // Check for division by zero or very small denominator
    if (Math.abs(derivative) < 1e-10) {
      guess = guess + 0.01;
      continue;
    }
    
    // Newton-Raphson update step
    const newGuess = guess - npv / derivative;
    
    // Check if we've converged
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess;
    }
    
    guess = newGuess;
  }
  
  // If we've exceeded max iterations, try a different initial guess
  if (initialGuess === 0.1) {
    return calculateIRR(cashFlows, 0.01, tolerance, maxIterations);
  }
  
  // Failed to converge
  return null;
}

/**
 * Calculate NPV (Net Present Value) and its derivative for the Newton-Raphson method
 */
function calculateNPVAndDerivative(cashFlows: number[], rate: number): { npv: number; derivative: number } {
  let npv = 0;
  let derivative = 0;
  
  for (let i = 0; i < cashFlows.length; i++) {
    const t = i;
    const denominator = Math.pow(1 + rate, t);
    
    // NPV calculation
    npv += cashFlows[i] / denominator;
    
    // Derivative calculation (for Newton-Raphson method)
    if (t > 0) {
      derivative -= (t * cashFlows[i]) / Math.pow(1 + rate, t + 1);
    }
  }
  
  return { npv, derivative };
}

/**
 * Calculate XIRR (Extended Internal Rate of Return)
 * For simplicity, this implementation assumes regular annual periods
 * In a real XIRR calculation, we would use actual dates
 */
export function calculateXIRR(
  cashFlows: number[],
  initialGuess: number = 0.1,
  tolerance: number = 1e-10,
  maxIterations: number = 1000
): number | null {
  // In a full implementation, we would use dates
  // Here we're essentially calculating regular IRR as a simplification
  return calculateIRR(cashFlows, initialGuess, tolerance, maxIterations);
}

/**
 * Calculate cumulative return (sum of all cash flows)
 */
export function calculateCumulativeReturn(cashFlows: number[]): number {
  return cashFlows.reduce((sum, value) => sum + value, 0);
}
