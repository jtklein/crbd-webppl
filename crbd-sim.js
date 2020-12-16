/**
 * Load the tree file
 */
var tree = phyjs.read_phyjson('bombac.phyjson');
phyjs.print_tree(tree);
tree;

var MAX_LAMBDA = 5;
var MAX_DIV = 5;

/**
 * Model specification
 */
var model = function () {
  // Define priors on lambda and mu
  var lambda = exponential({ a: 1 });
  var epsilon = uniform({ a: 0.0, b: 1.0 });
  var mu = epsilon * lambda;
  var rho = 0.59;

  // Simulate conditionally on the tree
  // It returns all variables of interest
  var ret = simCRBD(tree, lambda, mu, rho);

  var max_M = 10000; // abort survivorship bias if recursion is too deep
  var M = M_crbdGoesUndetected(tree.age, lambda, mu, rho, max_M);
  factor(Math.log(M));

  return ret;
};

/**
 * Inference
 * tweak the number of particles if you want to
 */
var particles = 10000;
var dist = Infer({ method: 'SMC', particles: particles, model: model });
display(dist);

/**
 * Extract and display the values for lambda and mu from the inference results
 */
var lambdaExtractor = function (x) {
  return x.value[0];
};
var lambdaSamples = map(lambdaExtractor, dist.samples);

var muExtractor = function (x) {
  return x.value[1];
};
var muSamples = map(muExtractor, dist.samples);

var displayValues = function (array) {
  display('computed mean');
  display(listMean(array));
  display('computed variance');
  display(listVar(array));
  display('computed standard deviation');
  display(listStdev(array));
  display('');
}
display('lambda:')
displayValues(lambdaSamples);
display('mu:');
displayValues(muSamples);

// Write data:
json.write('calc.json', dist.samples);
