import { derivative, parse } from 'mathjs';
import Algebrite from 'algebrite';

export const differentiateExpression = (expression, variable = 'x') => {
  try {
    const node = parse(expression); // Parse the expression into a syntax tree
    const diff = derivative(node, variable); // Differentiate with respect to the variable
    return diff.toString(); // Convert the result to a string
  } catch (error) {
    return "Error in differentiation";
  }
};

export const integrateExpression = (expression, variable = 'x') => {
    try {
        const integral = Algebrite.integral(Algebrite.run(expression)).toString();
        return integral;
      } catch (error) {
        return "Error in integration";
    }
};
